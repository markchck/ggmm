// 4분할 해서 순서 섞기
import React, { useEffect, useState, useRef } from "react";
import "./Item.css";

const ItemSevenAll = ({ streamManager }) => {
  const videoRef = React.createRef();
  const canvasRef = useRef(null);
  useEffect(() => {
    streamManager.addVideoElement(videoRef.current);
  }, [streamManager, videoRef]);

  useEffect(() => {
    if(canvasRef.current){

      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      const ctx = canvasRef.current.getContext("2d");
      function drawFrame() {
        if (videoRef.current && !videoRef.current.ended) {
        // if (!videoRef.current.paused && !videoRef.current.ended) {
          
          // ctx.restore();
          ctx.filter = "blur(20px)";
          ctx.translate(canvasRef.current.width, 0);
          ctx.scale(-1, 1);
          ctx.drawImage(
            videoRef.current,
            0,
            0,
            videoRef.current.videoWidth / 2,
            videoRef.current.videoHeight / 2,
            0,
            videoRef.current.videoHeight / 2,
            videoRef.current.videoWidth / 2,
            videoRef.current.videoHeight / 2
          );
          ctx.translate(0, 0);
          ctx.scale(1, 1);
          ctx.drawImage(
            videoRef.current,
            0,
            0,
            videoRef.current.videoWidth / 2,
            videoRef.current.videoHeight / 2,
            0,
            videoRef.current.videoHeight / 2,
            videoRef.current.videoWidth / 2,
            videoRef.current.videoHeight / 2
          );
          ctx.translate(canvasRef.current.width, 0);
          ctx.scale(-1, 1);
          ctx.drawImage(
            videoRef.current,
            0,
            videoRef.current.videoHeight / 2,
            videoRef.current.videoWidth / 2,
            videoRef.current.videoHeight / 2,
            videoRef.current.videoWidth / 2,
            videoRef.current.videoHeight / 2,
            videoRef.current.videoWidth / 2,
            videoRef.current.videoHeight / 2
          );
          ctx.translate(0, 0);
          ctx.scale(1, 1);
          ctx.drawImage(
            videoRef.current,
            0,
            videoRef.current.videoHeight / 2,
            videoRef.current.videoWidth / 2,
            videoRef.current.videoHeight / 2,
            videoRef.current.videoWidth / 2,
            videoRef.current.videoHeight / 2,
            videoRef.current.videoWidth / 2,
            videoRef.current.videoHeight / 2
          );
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.filter = "none";
          // ctx.save();
          // ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          setTimeout(drawFrame, 50);
        }
      }
      drawFrame();
      
      return ()=>{
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
    // videoRef.current.addEventListener("play", () => {
  }, [videoRef]);

  return (
    <div>
      <canvas style={{ display: "block" }} ref={canvasRef} className="Video_myturn"/>
      <video ref={videoRef} className="Video_myturn Video_hidden" muted/>
    </div>
  );
};

export default ItemSevenAll;
