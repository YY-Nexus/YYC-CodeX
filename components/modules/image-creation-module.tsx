"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  ImageIcon,
  Wand2,
  Upload,
  Download,
  Palette,
  Sparkles,
  Zap,
  Eye,
  Expand,
  Scissors,
  FileImage,
  Settings,
} from "lucide-react"

export function ImageCreationModule() {
  const [activeTab, setActiveTab] = useState("text-to-image")
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [selectedStyle, setSelectedStyle] = useState("realistic")
  const [imageSize, setImageSize] = useState("1024x1024")
  const [steps, setSteps] = useState([30])
  const [guidance, setGuidance] = useState([7.5])
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const styles = [
    { id: "realistic", name: "写实风格", preview: "🎨" },
    { id: "anime", name: "动漫风格", preview: "🎭" },
    { id: "oil-painting", name: "油画风格", preview: "🖼️" },
    { id: "watercolor", name: "水彩风格", preview: "🎨" },
    { id: "digital-art", name: "数字艺术", preview: "💻" },
    { id: "sketch", name: "素描风格", preview: "✏️" },
  ]

  const sizes = [
    { value: "512x512", label: "512×512 (正方形)" },
    { value: "768x768", label: "768×768 (正方形)" },
    { value: "1024x1024", label: "1024×1024 (正方形)" },
    { value: "1024x768", label: "1024×768 (横向)" },
    { value: "768x1024", label: "768×1024 (纵向)" },
  ]

  const handleTextToImage = async () => {
    if (!prompt.trim()) return
    setIsGenerating(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsGenerating(false)
          setGeneratedImages([
            `/placeholder.svg?height=400&width=400&query=AI generated image based on: ${prompt}`,
            `/placeholder.svg?height=400&width=400&query=Alternative AI art for: ${prompt}`,
            `/placeholder.svg?height=400&width=400&query=Creative interpretation: ${prompt}`,
            `/placeholder.svg?height=400&width=400&query=Artistic vision: ${prompt}`,
          ])
          return 100
        }
        return prev + 2
      })
    }, 100)
  }

  const handleImageToImage = async () => {
    if (!uploadedImage || !prompt.trim()) return
    setIsGenerating(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsGenerating(false)
          setGeneratedImages([
            `/placeholder.svg?height=400&width=400&query=Image-to-image transformation: ${prompt}`,
            `/placeholder.svg?height=400&width=400&query=Style transfer result: ${prompt}`,
            `/placeholder.svg?height=400&width=400&query=AI enhanced version: ${prompt}`,
            `/placeholder.svg?height=400&width=400&query=Creative reimagining: ${prompt}`,
          ])
          return 100
        }
        return prev + 3
      })
    }, 80)
  }

  const handleImageExpansion = async () => {
    if (!uploadedImage) return
    setIsGenerating(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsGenerating(false)
          setGeneratedImages([
            `/placeholder.svg?height=600&width=800&query=Expanded image with extended boundaries`,
            `/placeholder.svg?height=800&width=600&query=Vertically expanded image`,
            `/placeholder.svg?height=800&width=800&query=Fully expanded square image`,
          ])
          return 100
        }
        return prev + 4
      })
    }, 120)
  }

  const handleImageEnhancement = async () => {
    if (!uploadedImage) return
    setIsGenerating(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsGenerating(false)
          setGeneratedImages([
            `/placeholder.svg?height=400&width=400&query=Enhanced image with improved quality`,
            `/placeholder.svg?height=400&width=400&query=Color corrected and sharpened image`,
            `/placeholder.svg?height=400&width=400&query=AI upscaled high resolution image`,
          ])
          return 100
        }
        return prev + 5
      })
    }, 60)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const getCurrentHandler = () => {
    switch (activeTab) {
      case "text-to-image":
        return handleTextToImage
      case "image-to-image":
        return handleImageToImage
      case "expand":
        return handleImageExpansion
      case "enhance":
        return handleImageEnhancement
      default:
        return handleTextToImage
    }
  }

  const getButtonText = () => {
    switch (activeTab) {
      case "text-to-image":
        return "开始文生图"
      case "image-to-image":
        return "开始图生图"
      case "expand":
        return "开始扩图"
      case "enhance":
        return "开始美图"
      default:
        return "开始创作"
    }
  }

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case "text-to-image":
        return <Wand2 className="w-4 h-4" />
      case "image-to-image":
        return <FileImage className="w-4 h-4" />
      case "expand":
        return <Expand className="w-4 h-4" />
      case "enhance":
        return <Sparkles className="w-4 h-4" />
      default:
        return <ImageIcon className="w-4 h-4" />
    }
  }

  return (
    <div className="h-full flex gap-6">
      {/* 左侧控制面板 */}
      <div className="w-80 space-y-4 overflow-y-auto">
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Palette className="w-5 h-5" />
              YYC³ ImageX
            </CardTitle>
            <p className="text-white/70 text-sm">AI图像创作工具</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/10">
                <TabsTrigger
                  value="text-to-image"
                  className="text-white data-[state=active]:bg-cyan-500/30 flex items-center gap-1"
                >
                  {getTabIcon("text-to-image")}
                  文生图
                </TabsTrigger>
                <TabsTrigger
                  value="image-to-image"
                  className="text-white data-[state=active]:bg-cyan-500/30 flex items-center gap-1"
                >
                  {getTabIcon("image-to-image")}
                  图生图
                </TabsTrigger>
              </TabsList>
              <TabsList className="grid w-full grid-cols-2 bg-white/10 mt-2">
                <TabsTrigger
                  value="expand"
                  className="text-white data-[state=active]:bg-cyan-500/30 flex items-center gap-1"
                >
                  {getTabIcon("expand")}
                  扩图
                </TabsTrigger>
                <TabsTrigger
                  value="enhance"
                  className="text-white data-[state=active]:bg-cyan-500/30 flex items-center gap-1"
                >
                  {getTabIcon("enhance")}
                  美图
                </TabsTrigger>
              </TabsList>

              <TabsContent value="text-to-image" className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium text-white/80 mb-2 block">描述您想要的图像</label>
                  <Textarea
                    placeholder="例如：一只可爱的小猫坐在彩虹桥上，背景是星空，梦幻风格..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[100px]"
                  />
                </div>
              </TabsContent>

              <TabsContent value="image-to-image" className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium text-white/80 mb-2 block">上传原始图像</label>
                  <div
                    className="border-2 border-dashed border-white/20 rounded-lg p-4 text-center cursor-pointer hover:border-white/40 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {uploadedImage ? (
                      <img
                        src={uploadedImage || "/placeholder.svg"}
                        alt="上传的图像"
                        className="w-full h-32 object-cover rounded"
                      />
                    ) : (
                      <div className="text-white/60">
                        <Upload className="w-8 h-8 mx-auto mb-2" />
                        <p>点击上传图像</p>
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-white/80 mb-2 block">转换描述</label>
                  <Textarea
                    placeholder="描述您希望如何转换这张图像..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
              </TabsContent>

              <TabsContent value="expand" className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium text-white/80 mb-2 block">上传要扩展的图像</label>
                  <div
                    className="border-2 border-dashed border-white/20 rounded-lg p-4 text-center cursor-pointer hover:border-white/40 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {uploadedImage ? (
                      <img
                        src={uploadedImage || "/placeholder.svg"}
                        alt="上传的图像"
                        className="w-full h-32 object-cover rounded"
                      />
                    ) : (
                      <div className="text-white/60">
                        <Upload className="w-8 h-8 mx-auto mb-2" />
                        <p>点击上传图像</p>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-white/80 mb-2 block">扩展方向</label>
                  <Select defaultValue="all">
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-white/20">
                      <SelectItem value="all" className="text-white">
                        全方向扩展
                      </SelectItem>
                      <SelectItem value="horizontal" className="text-white">
                        水平扩展
                      </SelectItem>
                      <SelectItem value="vertical" className="text-white">
                        垂直扩展
                      </SelectItem>
                      <SelectItem value="top" className="text-white">
                        向上扩展
                      </SelectItem>
                      <SelectItem value="bottom" className="text-white">
                        向下扩展
                      </SelectItem>
                      <SelectItem value="left" className="text-white">
                        向左扩展
                      </SelectItem>
                      <SelectItem value="right" className="text-white">
                        向右扩展
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="enhance" className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium text-white/80 mb-2 block">上传要美化的图像</label>
                  <div
                    className="border-2 border-dashed border-white/20 rounded-lg p-4 text-center cursor-pointer hover:border-white/40 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {uploadedImage ? (
                      <img
                        src={uploadedImage || "/placeholder.svg"}
                        alt="上传的图像"
                        className="w-full h-32 object-cover rounded"
                      />
                    ) : (
                      <div className="text-white/60">
                        <Upload className="w-8 h-8 mx-auto mb-2" />
                        <p>点击上传图像</p>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-white/80 mb-2 block">美化选项</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      高清修复
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      色彩增强
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      降噪处理
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      锐化处理
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* 风格选择 - 仅在文生图和图生图时显示 */}
            {(activeTab === "text-to-image" || activeTab === "image-to-image") && (
              <div>
                <label className="text-sm font-medium text-white/80 mb-2 block">艺术风格</label>
                <div className="grid grid-cols-2 gap-2">
                  {styles.map((style) => (
                    <Button
                      key={style.id}
                      variant={selectedStyle === style.id ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => setSelectedStyle(style.id)}
                      className={`justify-start ${
                        selectedStyle === style.id
                          ? "bg-cyan-500/20 border-cyan-400/50 text-cyan-100"
                          : "border-white/20 text-white/80 hover:bg-white/10"
                      }`}
                    >
                      <span className="mr-2">{style.preview}</span>
                      {style.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* 图像尺寸 */}
            <div>
              <label className="text-sm font-medium text-white/80 mb-2 block">输出尺寸</label>
              <Select value={imageSize} onValueChange={setImageSize}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-white/20">
                  {sizes.map((size) => (
                    <SelectItem key={size.value} value={size.value} className="text-white">
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 高级设置 */}
            {(activeTab === "text-to-image" || activeTab === "image-to-image") && (
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-white/80 mb-2 block">生成步数: {steps[0]}</label>
                  <Slider value={steps} onValueChange={setSteps} max={50} min={10} step={5} className="w-full" />
                </div>

                <div>
                  <label className="text-sm font-medium text-white/80 mb-2 block">引导强度: {guidance[0]}</label>
                  <Slider value={guidance} onValueChange={setGuidance} max={20} min={1} step={0.5} className="w-full" />
                </div>
              </div>
            )}

            {/* 生成按钮 */}
            <Button
              onClick={getCurrentHandler()}
              disabled={
                isGenerating ||
                (activeTab === "text-to-image" && !prompt.trim()) ||
                ((activeTab === "image-to-image" || activeTab === "expand" || activeTab === "enhance") &&
                  !uploadedImage)
              }
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold py-3"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                  AI处理中...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  {getButtonText()}
                </>
              )}
            </Button>

            {/* 进度条 */}
            {isGenerating && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-white/70">
                  <span>处理进度</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="bg-white/10" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* 快速模板 - 仅在文生图时显示 */}
        {activeTab === "text-to-image" && (
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-sm">快速模板</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {["科幻城市夜景", "梦幻森林仙境", "抽象艺术作品", "可爱动物肖像", "未来机器人"].map((template) => (
                  <Button
                    key={template}
                    variant="ghost"
                    size="sm"
                    onClick={() => setPrompt(template)}
                    className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
                  >
                    {template}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* 右侧结果展示区 */}
      <div className="flex-1 space-y-4">
        <Card className="bg-white/5 border-white/10 h-full">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                创作结果
              </div>
              {generatedImages.length > 0 && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    批量下载
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    批量编辑
                  </Button>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="h-full">
            {isGenerating ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full mx-auto mb-4"
                  />
                  <p className="text-white/80 text-lg">
                    AI正在为您
                    {activeTab === "text-to-image"
                      ? "创作"
                      : activeTab === "image-to-image"
                        ? "转换"
                        : activeTab === "expand"
                          ? "扩展"
                          : "美化"}
                    图像...
                  </p>
                  <p className="text-white/60 text-sm mt-2">
                    预计需要 {activeTab === "enhance" ? "10-30" : "30-60"} 秒
                  </p>
                </div>
              </div>
            ) : generatedImages.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 h-full">
                {generatedImages.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group cursor-pointer"
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`生成图像 ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg border border-white/20"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                      <Button size="sm" variant="secondary">
                        <Eye className="w-4 h-4 mr-2" />
                        预览
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Download className="w-4 h-4 mr-2" />
                        下载
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Scissors className="w-4 h-4 mr-2" />
                        编辑
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-white/60">
                <div className="text-center">
                  {getTabIcon(activeTab)}
                  <div className="w-16 h-16 mx-auto mb-4 opacity-50 flex items-center justify-center">
                    {activeTab === "text-to-image" && <Wand2 className="w-16 h-16" />}
                    {activeTab === "image-to-image" && <FileImage className="w-16 h-16" />}
                    {activeTab === "expand" && <Expand className="w-16 h-16" />}
                    {activeTab === "enhance" && <Sparkles className="w-16 h-16" />}
                  </div>
                  <p className="text-lg">
                    {activeTab === "text-to-image" && "准备开始您的文生图创作"}
                    {activeTab === "image-to-image" && "上传图像开始图生图转换"}
                    {activeTab === "expand" && "上传图像开始智能扩图"}
                    {activeTab === "enhance" && "上传图像开始AI美图"}
                  </p>
                  <p className="text-sm mt-2">
                    {activeTab === "text-to-image" && "输入描述，让AI为您创造独特的艺术作品"}
                    {activeTab === "image-to-image" && "基于现有图像进行风格转换和创意重构"}
                    {activeTab === "expand" && "智能扩展图像边界，生成更大尺寸的完整画面"}
                    {activeTab === "enhance" && "AI驱动的图像美化，提升画质和视觉效果"}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
