"use client";
// dashboard.tsx

import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";

// import RecordRTC from "recordrtc";
import dynamic from "next/dynamic";
const VideoScreenRecorder = dynamic(
  () => import("../../VideoScreenRecorder/components/VideoScreenRecorderRest"),
  { ssr: false }
);

const VideoAndAudioRecorder = dynamic(
  () => import("../../VideoScreenRecorder/components/VideoAndAudioRecorder"),
  { ssr: false }
);
const ScreenAndAudioRecorder = dynamic(
  () => import("../../VideoScreenRecorder/components/ScreenAndAudioRecrding"),
  { ssr: false }
);

import { Button } from "ui/components/button";
import { Sidebar } from "ui/components/sidebar";
import { Input } from "ui/components/input";
import { BorderLessInput } from "ui/components/borderlessinput";
import { Icons } from "ui/components/icons";
import { Label } from "ui/components/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "ui/components/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  X,
  DialogOverlay,
} from "ui/components/dialog";
import { User as UserType } from "../../../types";

import { MyContextProvider, useMyContext } from "../../../context/MyContext";
import MyPulzePage from "../sideComponents/MyPulzeComponent";
import ActivityPage from "../sideComponents/ActivityComponent";
// import { Popover } from "ui/components/popover";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "ui/components/dropdown";
import ToggleButton from "./toggleButton";
import { Disc2, Link, Mic, MicOff, Send, Video, VideoOff } from "lucide-react";
import { log } from "console";
// import { DatePickerWithPresets } from "ui/components/datepicker";

import AutoComplete from "./Autocomplete";
// import { VideoScreenRecorder } from "../VideoScreenRecorder/components/VideoScreenRecorderRest";
// import MyTabs from "./components/tabs";
interface ReceivedVideo {
  id: string;
  userId: string;
  sendVideo: {
    video: {
      video_id: string;
      title: string; // Add other properties as needed
    };
  };
  FYI: boolean;
  email: string;
  // Add other properties as needed
}
const Dashboard = () => {
  const [recordedVideoLink, setRecordedVideoLink] = useState(null);
  const videoScreenRecorderRef = useRef(null);
  const cameraAudioRecorderRef = useRef(null);
  const screenAudioRecorderRef = useRef(null);

  const [isNotRecording, setIsNotRecording] = useState(true);
  // const [isNotRecording, setIsNotRecording] = useState(true);

  const [isIcon1Visible, setIsIcon1Visible] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [moveToRecordingCompleted, setMoveToRecordingCompleted] =
    useState(false);
  const [selectedUsers, setSelectedUsers] = useState<UserType[]>([]);

  const { resultVideosrccontext } = useMyContext();
  const { data: session, status } = useSession();

  // const [videoIdFromVideoScreenRecorder, setVideoIdFromVideoScreenRecorder] =
  //   useState("");
  const [videoIdFromRecorder, setVideoIdFromRecorder] = useState("");
  const [userVideos, setUserVideos] = useState([]);
  const [recievedVideos, setRecievedVideos] = useState([]);
  const receivedVideosArray: ReceivedVideo[] = [];
  receivedVideosArray.push(...recievedVideos);
  const [currentComponent, setCurrentComponent] = useState("activity");
  // const videoScreenRecorderRef = React.createRef();
  // Function to set the recorded data
  const handleRecordingComplete = (data) => {
    setRecordedVideoLink(data);
  };
  const handleRecording = () => {
    setIsNotRecording(true);
  };

  const handleToggle = () => {
    setIsIcon1Visible(!isIcon1Visible);
  };

  const handleStartRecording = () => {
    console.log("hadleStartRecord111");

    console.log("hadleStartRecord222");

    (videoScreenRecorderRef.current as any).startRecording();
    setIsNotRecording(false);
  };

  const handleStopRecording = () => {
    console.log("hadleStartRecord111");

    console.log("hadleStartRecord222");

    (videoScreenRecorderRef.current as any).stopRecording();
    // setIsNotRecording(true);
    console.log(`resultvideosrc in grandparent:${resultVideosrccontext}`);
    setMoveToRecordingCompleted(true);
  };

  const handleCameraAndAudioStartRecording = () => {
    console.log("hadleStartRecord111");

    console.log("hadleStartRecord222");

    (cameraAudioRecorderRef.current as any).startRecording();
    setIsNotRecording(false);
  };

  const handleCameraAndAudioStopRecording = () => {
    console.log("hadleStartRecord111");

    console.log("hadleStartRecord222");

    (cameraAudioRecorderRef.current as any).stopRecording();
    // setIsNotRecording(true);
    setMoveToRecordingCompleted(true);
  };

  const handleScreenAndAudioStartRecording = () => {
    console.log("hadleStartRecord111");

    console.log("hadleStartRecord222");

    (screenAudioRecorderRef.current as any).startRecording();
    setIsNotRecording(false);
  };
  const handleScreenAndAudioStopRecording = () => {
    console.log("hadleStartRecord111");

    console.log("hadleStartRecord222");

    (screenAudioRecorderRef.current as any).stopRecording();
    // setIsNotRecording(true);
    setMoveToRecordingCompleted(true);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    console.log(title);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSelectedUsersChange = (users: UserType[]) => {
    // Handle the selected users in the parent component
    setSelectedUsers(users);
    console.log("selected Users in parent:", selectedUsers);
    setSelectedUsers((prevUsers) => {
      console.log("Previous selected users:", prevUsers);
      console.log("New selected users:", users);
      return users; // Set the state to the new users
    });
  };
  const handleUsers = () => {
    // Handle the selected users in the parent component
    console.log("selected Users in parent when button pressed", selectedUsers);
  };
  const handleResultsrc = (src) => {
    // Handle the selected users in the parent component
    console.log("src when button pressed", src);
  };

  const handleRecordingCompleteAndGettingVideoId = (videoId) => {
    console.log("Video ID from stopRecording(parent):", videoId);
    // setVideoIdFromVideoScreenRecorder(videoId);
    setVideoIdFromRecorder(videoId);

    // console.log("videoId in variable", videoIdFromVideoScreenRecorder);
    console.log("videoId in variable", videoIdFromRecorder);

    // Now you can use the videoIdFromStopRecording as needed in your parent component
  };
  // const userId = "d68e3f11-bdab-430f-9dc2-54c2c088864d";
  const workspaceId = "1bd89f4c-36eb-4411-9232-acb129219e8f";
  const userId = session?.user.id;

  const handleSendVideo = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/sendVideo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId: userId,
          recipientData: selectedUsers,
          // videoId: videoIdFromVideoScreenRecorder,
          videoId: videoIdFromRecorder,

          responseTime: "2024-02-27T12:00:00.000Z",
          workspaceId: workspaceId,
        }),
      });

      if (response.ok) {
        console.log("Video sent successfully!");
        const data = await response.json();
        console.log("SendVideo response:", data);
      } else {
        console.error("Failed to send video.");
        const data = await response.json();
        console.error("Error response:", data);
      }
    } catch (error) {
      console.error("Error sending video:", error);
    }
  };
  const fetchUserVideos = async () => {
    try {
      if (session) {
        const userId = session?.user.id;
        console.log("userId from session", userId);

        const response = await fetch(
          `http://localhost:8080/api/getvideos/${session?.user.id}`
        );
        const data = await response.json();
        console.log("user videos in db", data);
        setUserVideos(data);
      } else {
        console.error("No active session");
      }
    } catch (error) {
      console.error("Error fetching user videos:", error);
    }
  };

  const fetchRecievedVideos = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/recievedvideos/${session?.user.id}`
      );
      const data = await response.json();
      console.log("recieved videos in db", data);

      // if (response.ok) {
      setRecievedVideos(data);

      // } else {
      //   console.error(data.error || "Error fetching video details");
      // }
    } catch (error) {
      console.error("An error occurred while fetching video details");
    }
  };

  const handleSidebarClick = (page: string) => {
    setCurrentComponent(page);
  };

  // const handleSidecomponentClick = () => {
  //   setIsSidebarOpen(!isSidebarOpen);
  // };

  // const handleButtonClick = () => {
  //   setIsSidebarOpen(true);
  // };
  useEffect(() => {
    if (status === "authenticated") {
      fetchUserVideos();
    }
    if (userId) {
      fetchRecievedVideos();
    }
  }, [session, userId]);
  console.log(userVideos);

  return (
    <div className="bg-slate-100 h-full w-full flex">
      {/* {JSON.stringify(session?.user.id)} */}
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <div
        id="default-sidebar"
        className="hidden md:block md:translate-x-0 h-screen bg-gray-200 w-2/12 "
      >
        <h1 className="mt-2 ml-5 font-bold">Pulzez</h1>
        <div className=" mt-5 flex flex-col justify-center">
          {/* <Button type="submit" className="h-10 mx-4" size="lg">
            New Pulze
          </Button> */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="h-10 mx-4 " size="lg">
                New Pulze
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]  flex flex-col justify-center  ">
              <DialogHeader className="">
                <DialogTitle className="">
                  <span className="font-normal ">New Pulze in </span>
                  <span className="font-semibold">Binu Baiju's team</span>
                </DialogTitle>
              </DialogHeader>

              <div className="grid  gap-4  ">
                <div className="grid grid-cols-10 items-center justify-start  ">
                  {/* <Label htmlFor="username" className="text-center  ml-3">
                    To:
                  </Label> */}
                  {/* To: */}
                  {/* <label className=" bg-green-500 ml-5">To:</label> */}
                  {/* <Input
                    id="username"
                    defaultValue="@peduarte"
                    readOnly
                    className="col-span-9 border-none focus:outline-none ring-0 text-left"
                  /> */}
                  <div className="border rounded-md  focus:outline-none  flex justify-start col-span-10  w-full bg-gray-100 ">
                    <AutoComplete
                      onSelectedUsersChange={handleSelectedUsersChange}
                    />

                    {/* <input
                      type="email"
                      // value={recipient}
                      // onChange={handleInputChange}
                      className="bg-transparent outline-none border-none p-0 ml-1  "
                      placeholder="Type a name or email"
                    /> */}
                  </div>
                  <Button onClick={handleUsers}>Hello</Button>
                </div>
                <div className="flex flex-col gap-0">
                  <BorderLessInput
                    className="font-semibold pl-0 border-none focus:border-none focus:ring-0 focus:outline-none outline-none text-slate-950"
                    placeholder="Untitled Pulze"
                    value={title}
                    onChange={handleTitleChange}
                  />
                  <BorderLessInput
                    className="pl-0 border-none focus:border-none focus:ring-0 focus:outline-none outline-none"
                    placeholder="Type a message"
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                </div>
              </div>
              <div className="bg-gray-100 h-full rounded-lg  w-full ">
                {resultVideosrccontext ? (
                  <>
                    <video
                      src={resultVideosrccontext}
                      controls
                      autoPlay
                      playsInline
                      // style={{ width: "40%" }}
                      className="w-full"
                    ></video>
                    <Button
                      onClick={() => handleResultsrc(resultVideosrccontext)}
                    >
                      Src
                    </Button>
                    <div className="flex justify-between  w-full mt-2">
                      <Button
                        className=" flex w-2/5 justify-center gap-1 text-violet-600 hover:text-violet-600 border border-violet-600 bg-transparent mb-3 "
                        variant="outline"
                      >
                        <Link size={20} />
                        Copy Link
                      </Button>
                      <Button
                        className=" flex w-2/5 justify-center gap-1 bg-violet-600 border border-violet-600 hover:bg-violet-700 mb-3 "
                        onClick={handleSendVideo}
                      >
                        <Send size={20} />
                        Send
                      </Button>
                    </div>
                  </>
                ) : (
                  <Tabs defaultValue="screen" className="w-full  h-full  ">
                    <TabsList className="flex justify-around gap-2 bg-white focus:bg-gray-100">
                      <TabsTrigger
                        value="screen"
                        className=" w-1/3 focus:bg-gray-900 flex gap-3 justify-center items-center"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="#000000"
                          viewBox="0 0 32 32"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path d="M30 2.994h-28c-1.099 0-2 0.9-2 2v17.006c0 1.099 0.9 1.999 2 1.999h13v3.006h-5c-0.552 0-1 0.448-1 1s0.448 1 1 1h12c0.552 0 1-0.448 1-1s-0.448-1-1-1h-5v-3.006h13c1.099 0 2-0.9 2-1.999v-17.006c0-1.1-0.901-2-2-2zM30 22h-28v-17.006h28v17.006z"></path>{" "}
                          </g>
                        </svg>
                        <p className="text-sm mb-1">Screen </p>
                      </TabsTrigger>
                      <TabsTrigger
                        value="camera"
                        className="  w-1/3 focus:bg-red-500 flex gap-3 justify-center items-center"
                      >
                        <svg
                          className="w-6 h-6"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              d="M16 10L18.5768 8.45392C19.3699 7.97803 19.7665 7.74009 20.0928 7.77051C20.3773 7.79703 20.6369 7.944 20.806 8.17433C21 8.43848 21 8.90095 21 9.8259V14.1741C21 15.099 21 15.5615 20.806 15.8257C20.6369 16.056 20.3773 16.203 20.0928 16.2295C19.7665 16.2599 19.3699 16.022 18.5768 15.5461L16 14M6.2 18H12.8C13.9201 18 14.4802 18 14.908 17.782C15.2843 17.5903 15.5903 17.2843 15.782 16.908C16 16.4802 16 15.9201 16 14.8V9.2C16 8.0799 16 7.51984 15.782 7.09202C15.5903 6.71569 15.2843 6.40973 14.908 6.21799C14.4802 6 13.9201 6 12.8 6H6.2C5.0799 6 4.51984 6 4.09202 6.21799C3.71569 6.40973 3.40973 6.71569 3.21799 7.09202C3 7.51984 3 8.07989 3 9.2V14.8C3 15.9201 3 16.4802 3.21799 16.908C3.40973 17.2843 3.71569 17.5903 4.09202 17.782C4.51984 18 5.07989 18 6.2 18Z"
                              stroke="#000000"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>{" "}
                          </g>
                        </svg>
                        Camera
                      </TabsTrigger>
                      <TabsTrigger
                        value="upload"
                        className="  w-1/3 ring-0 focus-visible:bg-red-500 flex gap-3 focus:ring-0"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="#000000"
                          viewBox="0 0 1024 1024"
                          xmlns="http://www.w3.org/2000/svg"
                          stroke="#000000"
                          strokeWidth="19.456"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <path d="M763.024 259.968C718.4 141.536 622.465 66.527 477.553 66.527c-184.384 0-313.392 136.912-324.479 315.536C64.177 410.495.002 501.183.002 603.903c0 125.744 98.848 231.968 215.823 231.968h92.448c17.664 0 32-14.336 32-32 0-17.68-14.336-32-32-32h-92.448c-82.304 0-152.832-76.912-152.832-167.968 0-80.464 56.416-153.056 127.184-165.216l29.04-5.008-2.576-29.328-.24-.368c0-155.872 102.576-273.44 261.152-273.44 127.104 0 198.513 62.624 231.537 169.44l6.847 22.032 23.056.496c118.88 2.496 223.104 98.945 223.104 218.77 0 109.055-72.273 230.591-181.696 230.591h-73.12c-17.664 0-32 14.336-32 32 0 17.68 14.336 32 32 32l72.88-.095c160-4.224 243.344-157.071 243.344-294.495 0-147.712-115.76-265.744-260.48-281.312zM535.985 514.941c-.176-.192-.241-.352-.354-.512l-8.095-8.464c-4.432-4.688-10.336-7.008-16.24-6.976-5.905-.048-11.777 2.288-16.289 6.975l-8.095 8.464c-.16.16-.193.353-.336.513L371.072 642.685c-8.944 9.344-8.944 24.464 0 33.84l8.064 5.471c8.945 9.344 23.44 6.32 32.368-3.024l68.113-75.935v322.432c0 17.664 14.336 32 32 32s32-14.336 32-32V603.34l70.368 77.631c8.944 9.344 23.408 12.369 32.336 3.025l8.064-5.472c8.945-9.376 8.945-24.496 0-33.84z"></path>
                          </g>
                        </svg>
                        Upload
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent
                      // style={{ minHeight: "300px", height: "auto" }}
                      value="screen"
                      className="flex flex-col justify-between gap-3 items-center   "
                    >
                      <div className="w-full  flex h-5/6  ">
                        <VideoScreenRecorder
                          onRecordingComplete={handleRecordingComplete}
                          playerRef={videoScreenRecorderRef}
                          title={title}
                          description={description}
                          videoId={undefined}
                          requestBody={undefined}
                          typeComment1={undefined}
                          saveVideoAfterStopRecordingOrNot={true}
                          onRecordingCompleteAndGettingVideoId={
                            handleRecordingCompleteAndGettingVideoId
                          }
                        />
                      </div>

                      <div className="flex flex-col items-start w-full ml-9 gap-3  mr-10 ">
                        {/* <div className="flex flex-col items-start w-full ml-9 gap-3  mr-10 "> */}
                        {moveToRecordingCompleted === false ? (
                          <div className=" w-full flex gap-2 ml-2">
                            <ToggleButton
                              icon1={
                                <Video color="#000000" className="w-5 h-5" />
                              }
                              icon2={<VideoOff className="w-4 h-4" />}
                              isIcon1Visible={isIcon1Visible}
                              onToggle={handleToggle}
                            />
                            <div className="bg-white w-5/6 rounded-lg flex  items-center justify-between">
                              <span className="ml-3">Camera Access</span>
                              <Button className="bg-white text-violet-600  hover:text-violet-900 hover:bg-white">
                                Allow
                              </Button>
                            </div>
                          </div>
                        ) : null}
                        {moveToRecordingCompleted === false ? (
                          <div className=" w-full flex gap-2 ml-2">
                            <ToggleButton
                              icon1={
                                <Mic color="#000000" className="w-5 h-5" />
                              }
                              icon2={
                                <MicOff color="#000000" className="w-5 h-5" />
                              }
                              isIcon1Visible={isIcon1Visible}
                              onToggle={handleToggle}
                            />
                            <div className="bg-white  w-5/6 rounded-lg flex  items-center justify-between">
                              <span className="ml-3">Microphone Access</span>
                              <Button className="bg-white text-violet-600  hover:text-violet-900 hover:bg-white">
                                Allow
                              </Button>
                            </div>
                          </div>
                        ) : null}

                        {/* </div> */}

                        <div className=" w-full  flex justify-center">
                          {isNotRecording ? (
                            <Button
                              className="w-full flex justify-center gap-2 bg-red-400 hover:bg-red-500 mb-3 mx-2"
                              onClick={handleStartRecording}
                            >
                              <Disc2 />
                              Start Recording
                            </Button>
                          ) : moveToRecordingCompleted ? (
                            <div className="flex justify-between  w-full mt-2">
                              <Button
                                className=" flex w-2/5 justify-center gap-1 text-violet-600 hover:text-violet-600 border border-violet-600 bg-transparent mb-3 "
                                variant="outline"
                                // onClick={handleStopRecording}
                              >
                                <Link size={20} />
                                Copy Link
                              </Button>
                              <Button
                                className=" flex w-2/5 justify-center gap-1 bg-violet-600 border border-violet-600 hover:bg-violet-700 mb-3 "
                                // onClick={handleStopRecording}
                              >
                                <Send size={20} />
                                Send
                              </Button>
                            </div>
                          ) : (
                            <Button
                              className="w-full flex justify-center gap-2 bg-red-400 hover:bg-red-500 mb-3 mx-2"
                              onClick={handleStopRecording}
                            >
                              <Disc2 />
                              Stop Recording
                            </Button>
                          )}
                          {/* <Button
                          className="w-full flex justify-center gap-2 bg-red-400 hover:bg-red-500 mb-3 mx-2"
                          onClick={handleStartRecording}
                        >
                          <Disc2 />
                          Start Recording
                        </Button>
                        <Button
                          className="w-full flex justify-center gap-2 bg-red-400 hover:bg-red-500 mb-3 mx-2"
                          onClick={handleStopRecording}
                        >
                          <Disc2 />
                          Stop Recording
                        </Button> */}
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent
                      // style={{ minHeight: "300px", height: "auto" }}
                      value="camera"
                      className="flex flex-col items-start items-center   "
                    >
                      <div className="w-full flex h-5/6  ">
                        {isIcon1Visible ? (
                          <VideoAndAudioRecorder
                            onRecordingComplete={handleRecordingComplete}
                            playerRef={cameraAudioRecorderRef}
                            title={title}
                            description={description}
                            saveVideoAfterStopRecordingOrNot={true}
                            onRecordingCompleteAndGettingVideoId={
                              handleRecordingCompleteAndGettingVideoId
                            }
                            typeComment1={undefined}
                            requestBody={undefined}
                            videoId={undefined}
                          />
                        ) : (
                          <ScreenAndAudioRecorder
                            onRecordingComplete={handleRecordingComplete}
                            playerRef={screenAudioRecorderRef}
                            title={title}
                            description={description}
                            saveVideoAfterStopRecordingOrNot={true}
                            onRecordingCompleteAndGettingVideoId={
                              handleRecordingCompleteAndGettingVideoId
                            }
                            typeComment1={undefined}
                            requestBody={undefined}
                            videoId={undefined}
                          />
                        )}
                      </div>

                      <div className="flex flex-col items-start w-full ml-9   gap-3 mr-10  ">
                        {moveToRecordingCompleted === false ? (
                          <div className=" w-full flex gap-2 ml-2">
                            <ToggleButton
                              icon1={
                                <Video color="#000000" className="w-5 h-5" />
                              }
                              icon2={
                                <VideoOff color="#000000" className="w-5 h-5" />
                              }
                              isIcon1Visible={isIcon1Visible}
                              onToggle={handleToggle}
                            />
                            <div className="bg-white w-5/6 rounded-lg flex  items-center justify-between">
                              <span className="ml-3">Camera Access</span>
                              <Button className="bg-white text-violet-600  hover:text-violet-900 hover:bg-white">
                                Allow
                              </Button>
                            </div>
                          </div>
                        ) : null}
                        <div className=" w-full flex gap-2 ml-2">
                          {/* <ToggleButton
                          icon1={<Mic color="#000000" className="w-5 h-5" />}
                          icon2={<MicOff color="#000000" className="w-5 h-5" />}
                          isIcon1Visible={isIcon1Visible}
                          onToggle={handleToggle}
                        /> */}
                          {/* <div className="bg-white  w-5/6 rounded-lg flex  items-center justify-between">
                          <span className="ml-3">Microphone Access</span>
                          <Button className="bg-white text-violet-600  hover:text-violet-900 hover:bg-white">
                            Allow
                          </Button>
                        </div> */}
                        </div>
                        {/* </div> */}

                        <div className=" w-full  flex justify-center">
                          {isNotRecording ? (
                            <Button
                              className="w-full flex justify-center gap-2 bg-red-400 hover:bg-red-500 mb-3 mx-2"
                              onClick={
                                isIcon1Visible
                                  ? handleCameraAndAudioStartRecording
                                  : handleScreenAndAudioStartRecording
                              }
                            >
                              <Disc2 />
                              Start Recording
                            </Button>
                          ) : moveToRecordingCompleted ? (
                            <div className="flex justify-between  w-full mt-2">
                              <Button
                                className=" flex w-2/5 justify-center gap-1 text-violet-600 hover:text-violet-600 border border-violet-600 bg-transparent mb-3 "
                                variant="outline"
                                // onClick={handleStopRecording}
                              >
                                <Link size={20} />
                                Copy Link
                              </Button>
                              <Button
                                className=" flex w-2/5 justify-center gap-1 bg-violet-600 border border-violet-600 hover:bg-violet-700 mb-3 "
                                // onClick={handleStopRecording}
                              >
                                <Send size={20} />
                                Send
                              </Button>
                            </div>
                          ) : (
                            <>
                              <div>{moveToRecordingCompleted}</div>
                              <Button
                                className="w-full flex justify-center gap-2 bg-red-400 hover:bg-red-500 mb-3 mx-2"
                                onClick={
                                  isIcon1Visible
                                    ? handleCameraAndAudioStopRecording
                                    : handleScreenAndAudioStopRecording
                                }
                              >
                                <Disc2 />
                                Stop Recording
                              </Button>
                            </>
                          )}
                          {/* {isNotRecording ? (
                          <Button
                            className="w-full flex justify-center gap-2 bg-green-400 hover:bg-red-500 mb-3 mx-2"
                            onClick={handleScreenAndAudioStartRecording}
                          >
                            <Disc2 />
                            Start Recording 2
                          </Button>
                        ) : (
                          <Button
                            className="w-full flex justify-center gap-2 bg-red-400 hover:bg-red-500 mb-3 mx-2"
                            onClick={handleScreenAndAudioStopRecording}
                          >
                            <Disc2 />
                            Stop Recording
                          </Button>
                        )} */}
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent
                      value="upload"
                      style={{ height: "auto" }}
                      className="flex flex-col justify-between gap-3 items-center min-h-96 bg-gray-200"
                    >
                      hello
                      {/* ... Content for the "Upload" tab ... */}
                    </TabsContent>

                    {/* <TabsContent
                    value="camera"
                    className="flex flex-col justify-between items-center  h-5/6"
                  >
                    <div className="flex flex-col  items-center w-full h-full">
                      Hello
                      <div className=" flex flex-col items-center justify-center w-full bg-red-500">
                        <VideoAndAudioRecorder />
                      </div>
                      <div className="flex flex-col items-start w-full ml-9 gap-3">
                        <ToggleButton
                          icon1={<Icons.audioOn />}
                          icon2={<Icons.audioOff />}
                        />
                        <ToggleButton
                          icon1={<Icons.audioOn />}
                          icon2={<Icons.audioOff />}
                        />
                        <div className=" w-11/12">
                          <Button className="w-full">Start Recording</Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent> */}
                  </Tabs>
                )}
              </div>

              {/* <DialogFooter>hwhud</DialogFooter> */}
            </DialogContent>
          </Dialog>

          {/* <!-- Modal toggle   */}

          <DropdownMenu>
            <DropdownMenuTrigger className="mt-2 bg-white mx-4 rounded-md h-9 flex justify-center items-center">
              binubaiju's{"teams"}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 mt-1"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
                    fill="#000000"
                  ></path>{" "}
                </g>
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Sidebar onSidebarClick={handleSidebarClick} />
      </div>
      {currentComponent === "activity" && (
        <div className=" bg-green-500 w-10/12">
          {/* <ActivityPage /> */}
          <MyPulzePage
            userVideos={userVideos}
            receivedVideos={receivedVideosArray}
          />
        </div>
      )}
      {currentComponent === "myPulzez" && (
        <div className=" bg-green-500 w-10/12">
          {/* <ActivityPage /> */}
          <ActivityPage />
        </div>
      )}
      {/* <Popover /> */}
    </div>
  );
};

export default Dashboard;
