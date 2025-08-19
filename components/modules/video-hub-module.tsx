"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import {
  Video,
  Upload,
  Scissors,
  Music,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Download,
  Sparkles,
  Mic,
  Type,
  Split,
  Merge,
  RotateCw,
  Crop,
  Palette,
  Wand2,
  FileVideo,
  Clock,
  Layers,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface VideoFile {
  file: File
  url: string
  duration: number
  name: string
}

interface VideoEffect {
  id: string
  name: string
  icon: any
  active: boolean
}

interface AudioEffect {
  id: string
  name: string
  value: number
}

export function VideoHubModule() {
  const [uploadedVideos, setUploadedVideos] = useState<VideoFile[]>([])
  const [currentVideo, setCurrentVideo] = useState<VideoFile | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState([80])
  const [isMuted, setIsMuted] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [activeTab, setActiveTab] = useState("upload")

  const videoRef = useRef<HTMLVideoElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [videoEffects, setVideoEffects] = useState<VideoEffect[]>([
    { id: "brightness", name: "亮度增强", icon: Sparkles, active: false },
    { id: "contrast", name: "对比度", icon: Palette, active: false },
    { id: "vintage", name: "复古滤镜", icon: Wand2, active: false },
    { id: "blackwhite", name: "黑白经典", icon: Layers, active: false },
    { id: "warm", name: "暖色调", icon: Sparkles, active: false },
    { id: "cool", name: "冷色调", icon: Sparkles, active: false },
    { id: "blur", name: "柔光效果", icon: Wand2, active: false },
    { id: "sharpen", name: "锐化增强", icon: Sparkles, active: false },
  ])

  const [audioEffects, setAudioEffects] = useState<AudioEffect[]>([
    { id: "noise-reduction", name: "降噪处理", value: 0 },
    { id: "volume-boost", name: "音量增强", value: 0 },
    { id: "echo", name: "回声效果", value: 0 },
    { id: "reverb", name: "混响效果", value: 0 },
    { id: "bass", name: "低音增强", value: 0 },
    { id: "treble", name: "高音清晰", value: 0 },
  ])

  const handleVideoUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files
      if (!files) return

      Array.from(files).forEach((file) => {
        if (file.type.startsWith("video/")) {
          const url = URL.createObjectURL(file)
          const video = document.createElement("video")

          video.onloadedmetadata = () => {
            const newVideo: VideoFile = {
              file,
              url,
              duration: video.duration,
              name: file.name,
            }

            setUploadedVideos((prev) => [...prev, newVideo])
            if (!currentVideo) {
              setCurrentVideo(newVideo)
              setDuration(video.duration)
            }
          }

          video.src = url
        }
      })
    },
    [currentVideo],
  )

  const togglePlayPause = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value)
    if (videoRef.current) {
      videoRef.current.volume = value[0] / 100
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleVideoEffect = (effectId: string) => {
    setVideoEffects((prev) =>
      prev.map((effect) => (effect.id === effectId ? { ...effect, active: !effect.active } : effect)),
    )
  }

  const updateAudioEffect = (effectId: string, value: number[]) => {
    setAudioEffects((prev) => prev.map((effect) => (effect.id === effectId ? { ...effect, value: value[0] } : effect)))
  }

  const processVideo = async () => {
    if (!currentVideo) return

    setIsProcessing(true)
    setProcessingProgress(0)

    // Simulate processing with realistic progress
    const steps = [
      { name: "分析视频文件", duration: 1000 },
      { name: "应用视频效果", duration: 2000 },
      { name: "处理音频轨道", duration: 1500 },
      { name: "渲染输出", duration: 2500 },
      { name: "生成最终文件", duration: 1000 },
    ]

    let totalProgress = 0
    for (const step of steps) {
      await new Promise((resolve) => {
        const interval = setInterval(() => {
          totalProgress += 2
          setProcessingProgress(Math.min(totalProgress, 100))
          if (totalProgress >= (100 / steps.length) * (steps.indexOf(step) + 1)) {
            clearInterval(interval)
            resolve(void 0)
          }
        }, step.duration / 50)
      })
    }

    setIsProcessing(false)
    setProcessingProgress(100)

    // Simulate download
    setTimeout(() => {
      const link = document.createElement("a")
      link.href = currentVideo.url
      link.download = `processed_${currentVideo.name}`
      link.click()
    }, 500)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="h-full space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white/10">
          <TabsTrigger value="upload" className="text-white data-[state=active]:bg-white/20">
            <Upload className="w-4 h-4 mr-2" />
            上传
          </TabsTrigger>
          <TabsTrigger value="edit" className="text-white data-[state=active]:bg-white/20">
            <Scissors className="w-4 h-4 mr-2" />
            编辑
          </TabsTrigger>
          <TabsTrigger value="effects" className="text-white data-[state=active]:bg-white/20">
            <Sparkles className="w-4 h-4 mr-2" />
            特效
          </TabsTrigger>
          <TabsTrigger value="export" className="text-white data-[state=active]:bg-white/20">
            <Download className="w-4 h-4 mr-2" />
            导出
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  视频上传
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-white/40 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Video className="w-12 h-12 mx-auto mb-4 text-white/50" />
                  <p className="text-white/80 mb-4">拖拽视频文件到此处或点击上传</p>
                  <p className="text-white/60 text-sm mb-4">支持 MP4, AVI, MOV, WMV 格式</p>
                  <Button className="bg-purple-500 hover:bg-purple-400">选择文件</Button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={handleVideoUpload}
                  className="hidden"
                />
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileVideo className="w-5 h-5" />
                  已上传视频
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {uploadedVideos.map((video, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        currentVideo?.url === video.url
                          ? "bg-purple-500/20 border-purple-400/50"
                          : "bg-white/5 border-white/10 hover:bg-white/10"
                      }`}
                      onClick={() => setCurrentVideo(video)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white/90 text-sm font-medium truncate">{video.name}</p>
                          <p className="text-white/60 text-xs">{formatTime(video.duration)}</p>
                        </div>
                        <Video className="w-4 h-4 text-white/50" />
                      </div>
                    </motion.div>
                  ))}
                  {uploadedVideos.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-white/40 text-sm">还没有上传视频</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="edit" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  视频预览
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentVideo ? (
                  <div className="space-y-4">
                    <div className="relative bg-black rounded-lg overflow-hidden">
                      <video
                        ref={videoRef}
                        src={currentVideo.url}
                        className="w-full h-80 object-contain"
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
                      />
                      <div className="absolute bottom-4 left-4 right-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <Button size="sm" onClick={togglePlayPause} className="bg-white/20 hover:bg-white/30">
                            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                          <span className="text-white text-sm">{formatTime(currentTime)}</span>
                          <Slider
                            value={[currentTime]}
                            max={duration}
                            step={0.1}
                            onValueChange={handleSeek}
                            className="flex-1"
                          />
                          <span className="text-white text-sm">{formatTime(duration)}</span>
                          <Button size="sm" onClick={toggleMute} className="bg-white/20 hover:bg-white/30">
                            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                          </Button>
                          <div className="w-20">
                            <Slider value={volume} max={100} step={1} onValueChange={handleVolumeChange} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <Video className="w-16 h-16 text-white/30 mx-auto mb-4" />
                    <p className="text-white/60 text-lg mb-2">选择视频开始编辑</p>
                    <p className="text-white/40">从左侧上传视频或选择已有视频</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Scissors className="w-5 h-5" />
                  编辑工具
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                  >
                    <Split className="w-3 h-3 mr-2" />
                    分割
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                  >
                    <Merge className="w-3 h-3 mr-2" />
                    合并
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                  >
                    <Crop className="w-3 h-3 mr-2" />
                    裁剪
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                  >
                    <RotateCw className="w-3 h-3 mr-2" />
                    旋转
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label className="text-white/90 text-sm">时间轴控制</Label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-white/70 text-xs w-12">开始</span>
                      <Slider defaultValue={[0]} max={duration} step={0.1} className="flex-1" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white/70 text-xs w-12">结束</span>
                      <Slider defaultValue={[duration]} max={duration} step={0.1} className="flex-1" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white">
                    <Mic className="w-4 h-4 mr-2" />
                    AI配音
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                    <Type className="w-4 h-4 mr-2" />
                    自动字幕
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="effects" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  视频特效
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {videoEffects.map((effect) => (
                    <Button
                      key={effect.id}
                      variant="outline"
                      size="sm"
                      onClick={() => toggleVideoEffect(effect.id)}
                      className={`justify-start ${
                        effect.active
                          ? "bg-purple-500/20 border-purple-400/50 text-white"
                          : "bg-white/5 border-white/20 text-white hover:bg-white/10"
                      }`}
                    >
                      <effect.icon className="w-3 h-3 mr-2" />
                      {effect.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Music className="w-5 h-5" />
                  音频处理
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {audioEffects.map((effect) => (
                  <div key={effect.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-white/90 text-sm">{effect.name}</Label>
                      <span className="text-white/60 text-xs">{effect.value}%</span>
                    </div>
                    <Slider
                      value={[effect.value]}
                      max={100}
                      step={1}
                      onValueChange={(value) => updateAudioEffect(effect.id, value)}
                      className="w-full"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="export" className="space-y-6">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Download className="w-5 h-5" />
                导出设置
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/90">输出格式</Label>
                  <select className="w-full p-2 rounded bg-white/10 border border-white/20 text-white">
                    <option value="mp4">MP4 (推荐)</option>
                    <option value="avi">AVI</option>
                    <option value="mov">MOV</option>
                    <option value="wmv">WMV</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="text-white/90">视频质量</Label>
                  <select className="w-full p-2 rounded bg-white/10 border border-white/20 text-white">
                    <option value="1080p">1080p (高清)</option>
                    <option value="720p">720p (标清)</option>
                    <option value="480p">480p (普清)</option>
                    <option value="4k">4K (超清)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="text-white/90">压缩率</Label>
                  <select className="w-full p-2 rounded bg-white/10 border border-white/20 text-white">
                    <option value="high">高质量 (大文件)</option>
                    <option value="medium">平衡 (推荐)</option>
                    <option value="low">高压缩 (小文件)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <Button
                  onClick={processVideo}
                  disabled={!currentVideo || isProcessing}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium px-8 py-3"
                >
                  {isProcessing ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      处理中...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      开始处理并导出
                    </>
                  )}
                </Button>
              </div>

              <AnimatePresence>
                {isProcessing && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between text-sm text-white/70">
                      <span>处理进度</span>
                      <span>{processingProgress}%</span>
                    </div>
                    <Progress value={processingProgress} className="bg-white/10" />
                    <p className="text-white/60 text-sm text-center">正在处理视频，请稍候...</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
