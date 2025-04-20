"use client"
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { AIModel, ConvertTextToSpeech, getToken } from '@/services/GlobalServices';
import { CoachingExpert } from '@/services/Options';
import { UserButton } from '@stackframe/stack';
import { RealtimeTranscriber } from 'assemblyai';
import { useMutation, useQuery } from 'convex/react';
import { Loader2Icon } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useRef, useState } from 'react'
import ChatBox from './_components/ChatBox';
import { toast } from 'sonner';
import { UserContext } from '@/app/_context/UserContext';
import Webcam from 'react-webcam';
// const RecordRTC = dynamic(() => import("recordrtc"), { ssr: false });
//import RecordRTC from 'recordrtc';

function DiscussionRoom() {
    const { roomid } = useParams();
    const { userData, setUserData } = useContext(UserContext);
    const DiscussionRoomData = useQuery(api.DiscussionRoom.GetDiscussionRoom, { id: roomid });
    const [expert, setExpert] = useState();
    const [enableMic, setEnableMic] = useState(false);
    const recorder = useRef(null)
    const realtimeTranscriber = useRef(null);
    const [transcribe, setTranscribe] = useState();
    const [conversation, setConversation] = useState([]);
    const [loading, setLoading] = useState(false);
    const [audioUrl, setAudioUrl] = useState();
    const [enableFeedbackNotes, setEnableFeedbackNotes] = useState(false);
    const UpdateConversation = useMutation(api.DiscussionRoom.UpdateConversation)
    const updateUserToken = useMutation(api.users.UpdateUserToken)
    let silenceTimeout;
    let waitForPause;
    let texts = {};

    const [isCameraEnabled, setIsCameraEnabled] = useState(null);

    //Check if camera enabled or not
    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then(() => setIsCameraEnabled(true))
            .catch(() => setIsCameraEnabled(false));
    }, []);

    useEffect(() => {
        if (DiscussionRoomData) {
            const Expert = CoachingExpert.find(item => item.name == DiscussionRoomData.expertName);
            console.log(Expert);
            setExpert(Expert);
        }
    }, [DiscussionRoomData])

    const connectToServer = async () => {

        setLoading(true);
        // Init Assembly AI
        realtimeTranscriber.current = new RealtimeTranscriber({
            token: await getToken(),
            sample_rate: 16_000
        })

        realtimeTranscriber.current.on('transcript', async (transcript) => {
            let msg = ''
            if (transcript.message_type == 'FinalTranscript') {
                setConversation(prev => [...prev, {
                    role: 'user',
                    content: transcript.text
                }]);
                await updateUserTokenMathod(transcript.text);// Update user generate Token
            }

            texts[transcript.audio_start] = transcript?.text;
            const keys = Object.keys(texts);
            keys.sort((a, b) => a - b);

            for (const key of keys) {
                if (texts[key]) {
                    msg += `${texts[key]}`
                }
            }

            setTranscribe(msg);
        })
        await realtimeTranscriber.current.connect();
        setLoading(false);
        setEnableMic(true);
        toast('Connected...')
        if (typeof window !== "undefined" && typeof navigator !== "undefined") {
            const RecordRTC = (await import("recordrtc")).default; //Importing here
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then((stream) => {
                    recorder.current = new RecordRTC(stream, {
                        type: 'audio',
                        mimeType: 'audio/webm;codecs=pcm',
                        recorderType: RecordRTC.StereoAudioRecorder,
                        timeSlice: 250,
                        desiredSampRate: 16000,
                        numberOfAudioChannels: 1,
                        bufferSize: 4096,
                        audioBitsPerSecond: 128000,
                        ondataavailable: async (blob) => {
                            if (!realtimeTranscriber.current) return;
                            // Reset the silence detection timer on audio input
                            clearTimeout(silenceTimeout);
                            const buffer = await blob.arrayBuffer();
                            // console.log(buffer)
                            realtimeTranscriber.current.sendAudio(buffer);
                            // Restart the silence detection timer
                            silenceTimeout = setTimeout(() => {
                                console.log('User stopped talking');
                                // Handle user stopped talking (e.g., send final transcript, stop recording, etc.)
                            }, 2000);

                        },

                    });
                    recorder.current.startRecording();
                })
                .catch((err) => console.error(err));

        }


    }

    useEffect(() => {
        clearTimeout(waitForPause);
        async function fetchData() {
            if (conversation[conversation.length - 1]?.role == 'user') {
                // Calling AI text Model to Get Response
                const lastTwoMsg = conversation.slice(-8);
                const aiResp = await AIModel(
                    DiscussionRoomData.topic,
                    DiscussionRoomData.coachingOption,
                    lastTwoMsg);

                const url = await ConvertTextToSpeech(aiResp.content, DiscussionRoomData.expertName);
                console.log(url)
                setAudioUrl(url);
                setConversation(prev => [...prev, aiResp]);
                await updateUserTokenMathod(aiResp.content);// Update AI generated TOKEN
            }
        }

        waitForPause = setTimeout(() => {
            console.log('WAIT...')
            fetchData()
        }, 800)
        console.log(conversation)


    }, [conversation])

    const disconnect = async (e) => {
        e.preventDefault();
        setLoading(true);
        await realtimeTranscriber.current.close();
        recorder.current.pauseRecording();
        recorder.current = null;
        setEnableMic(false);
        toast('Disconnected!')
        await UpdateConversation({
            id: DiscussionRoomData._id,
            conversation: conversation
        })

        setLoading(false);
        setEnableFeedbackNotes(true);

    }

    const updateUserTokenMathod = async (text) => {
        const tokenCount = text.trim() ? text.trim().split(/\s+/).length : 0
        const result = await updateUserToken({
            id: userData._id,
            credits: Number(userData.credits) - Number(tokenCount)
        })

        setUserData(prev => ({
            ...prev,
            credits: Number(userData.credits) - Number(tokenCount)
        }))
    }


    return (
        <div className='-mt-12'>
            <h2 className='text-lg font-bold'>{DiscussionRoomData?.coachingOption}</h2>
            <div className='mt-5 grid grid-cols-1 lg:grid-cols-3 gap-10'>
                <div className='lg:col-span-2'>
                    <div className=' h-[60vh] bg-secondary border rounded-4xl
                flex flex-col items-center justify-center relative
                '>
                        {expert?.avatar && <Image src={expert?.avatar} alt='Avatar' width={200} height={200}
                            className='h-[80px] w-[80px] rounded-full object-cover animate-pulse'
                        />}
                        <h2 className='text-gray-500'>{expert?.name}</h2>

                        <audio src={audioUrl} type="audio/mp3" autoPlay />
                        {!isCameraEnabled ? <div className='p-5 bg-gray-200 px-10 rounded-lg absolute bottom-10 right-10'>
                            <UserButton />
                        </div> :
                            <div className='absolute bottom-10 right-10'>
                                <Webcam height={80}
                                    width={130}
                                    className='rounded-2xl'
                                />
                            </div>}
                    </div>
                    <div className='mt-5 flex items-center justify-center'>
                        {!enableMic ? <Button onClick={connectToServer} disabled={loading}>
                            {loading && <Loader2Icon className='animate-spin' />} Connect</Button>
                            :
                            <Button variant="destructive" onClick={disconnect} disabled={loading}>
                                {loading && <Loader2Icon className='animate-spin' />}
                                Disconnect</Button>}
                    </div>
                </div>
                <div>
                    <ChatBox conversation={conversation}
                        enableFeedbackNotes={enableFeedbackNotes}
                        coachingOption={DiscussionRoomData?.coachingOption}
                    />
                </div>
            </div>

            {transcribe && <div>
                <h2 className='p-4 border rounded-2xl mt-5'>{transcribe}</h2>
            </div>}
        </div>
    )
}

export default DiscussionRoom