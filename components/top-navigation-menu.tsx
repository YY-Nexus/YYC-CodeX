"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  User,
  Settings,
  HelpCircle,
  Wifi,
  WifiOff,
  ChevronDown,
  UserCircle,
  Heart,
  History,
  LogOut,
  Palette,
  Globe,
  Keyboard,
  Download,
  Upload,
  BookOpen,
  Zap,
  MessageCircle,
  Phone,
  Info,
  X,
  Save,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface NetworkStatus {
  isOnline: boolean
  speed: string
  latency: number
}

type SettingsPanelType =
  | "ai-settings"
  | "interface-settings"
  | "language-settings"
  | "shortcuts"
  | "import-data"
  | "export-data"
  | "user-profile"
  | "favorites"
  | "history"
  | "user-guide"
  | "quick-start"
  | "faq"
  | "contact-support"
  | "about-us"
  | null

export function TopNavigationMenu() {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isOnline: true,
    speed: "检测中...",
    latency: 0,
  })

  const [activePanel, setActivePanel] = useState<SettingsPanelType>(null)

  useEffect(() => {
    const checkNetworkStatus = () => {
      setNetworkStatus((prev) => ({
        ...prev,
        isOnline: navigator.onLine,
      }))
    }

    const measureNetworkSpeed = async () => {
      try {
        const startTime = performance.now()
        await fetch("/api/health", { method: "HEAD" })
        const endTime = performance.now()
        const latency = Math.round(endTime - startTime)

        let speed = "良好"
        if (latency > 1000) speed = "较慢"
        else if (latency > 500) speed = "一般"
        else if (latency < 100) speed = "极快"

        setNetworkStatus((prev) => ({
          ...prev,
          speed,
          latency,
        }))
      } catch (error) {
        setNetworkStatus((prev) => ({
          ...prev,
          speed: "离线",
          latency: 0,
        }))
      }
    }

    checkNetworkStatus()
    measureNetworkSpeed()

    window.addEventListener("online", checkNetworkStatus)
    window.addEventListener("offline", checkNetworkStatus)

    const interval = setInterval(measureNetworkSpeed, 30000)

    return () => {
      window.removeEventListener("online", checkNetworkStatus)
      window.removeEventListener("offline", checkNetworkStatus)
      clearInterval(interval)
    }
  }, [])

  const handleMenuItemClick = (panelType: SettingsPanelType) => {
    setActivePanel(panelType)
  }

  const closePanel = () => {
    setActivePanel(null)
  }

  const userMenuItems = [
    { icon: UserCircle, label: "个人资料", color: "text-blue-500", action: "user-profile" },
    { icon: Heart, label: "我的收藏", color: "text-red-500", action: "favorites" },
    { icon: History, label: "使用历史", color: "text-green-500", action: "history" },
    { icon: LogOut, label: "退出登录", color: "text-gray-500", action: "logout" },
  ]

  const settingsMenuItems = [
    { icon: Palette, label: "AI设置", color: "text-purple-500", action: "ai-settings" },
    { icon: Palette, label: "界面设置", color: "text-pink-500", action: "interface-settings" },
    { icon: Globe, label: "语言设置", color: "text-cyan-500", action: "language-settings" },
    { icon: Keyboard, label: "快捷键", color: "text-orange-500", action: "shortcuts" },
    { icon: Download, label: "导入数据", color: "text-green-500", action: "import-data" },
    { icon: Upload, label: "导出数据", color: "text-blue-500", action: "export-data" },
  ]

  const helpMenuItems = [
    { icon: BookOpen, label: "使用指南", color: "text-indigo-500", action: "user-guide" },
    { icon: Zap, label: "快速入门", color: "text-yellow-500", action: "quick-start" },
    { icon: MessageCircle, label: "常见问题", color: "text-green-500", action: "faq" },
    { icon: Phone, label: "联系支持", color: "text-red-500", action: "contact-support" },
    { icon: Info, label: "关于我们", color: "text-gray-500", action: "about-us" },
  ]

  const renderSettingsPanel = () => {
    switch (activePanel) {
      case "ai-settings":
        return (
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-purple-500" />
                AI设置
              </DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="general">常规设置</TabsTrigger>
                <TabsTrigger value="model">模型配置</TabsTrigger>
                <TabsTrigger value="advanced">高级选项</TabsTrigger>
              </TabsList>
              <TabsContent value="general" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ai-name">AI助手名称</Label>
                  <Input id="ai-name" placeholder="请输入AI助手名称" defaultValue="YanYu AI" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-response">自动回复</Label>
                  <Switch id="auto-response" defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="response-style">回复风格</Label>
                  <Select defaultValue="friendly">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">专业</SelectItem>
                      <SelectItem value="friendly">友好</SelectItem>
                      <SelectItem value="casual">随意</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
              <TabsContent value="model" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="model-select">AI模型</Label>
                  <Select defaultValue="gpt-4">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                      <SelectItem value="claude">Claude</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="temperature">创造性 (Temperature)</Label>
                  <Input id="temperature" type="number" min="0" max="2" step="0.1" defaultValue="0.7" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-tokens">最大令牌数</Label>
                  <Input id="max-tokens" type="number" min="1" max="4000" defaultValue="2000" />
                </div>
              </TabsContent>
              <TabsContent value="advanced" className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="context-memory">上下文记忆</Label>
                  <Switch id="context-memory" defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="system-prompt">系统提示词</Label>
                  <Textarea
                    id="system-prompt"
                    placeholder="请输入系统提示词..."
                    defaultValue="你是一个专业的AI助手，请用中文回答用户的问题。"
                    rows={4}
                  />
                </div>
              </TabsContent>
            </Tabs>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={closePanel}>
                <X className="w-4 h-4 mr-2" />
                取消
              </Button>
              <Button onClick={closePanel}>
                <Save className="w-4 h-4 mr-2" />
                保存设置
              </Button>
            </div>
          </DialogContent>
        )

      case "interface-settings":
        return (
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-pink-500" />
                界面设置
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="theme">主题模式</Label>
                <Select defaultValue="auto">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">浅色模式</SelectItem>
                    <SelectItem value="dark">深色模式</SelectItem>
                    <SelectItem value="auto">跟随系统</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="color-scheme">配色方案</Label>
                <Select defaultValue="purple">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="purple">紫色</SelectItem>
                    <SelectItem value="blue">蓝色</SelectItem>
                    <SelectItem value="green">绿色</SelectItem>
                    <SelectItem value="orange">橙色</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="animations">动画效果</Label>
                <Switch id="animations" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="compact-mode">紧凑模式</Label>
                <Switch id="compact-mode" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="font-size">字体大小</Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">小</SelectItem>
                    <SelectItem value="medium">中</SelectItem>
                    <SelectItem value="large">大</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={closePanel}>
                取消
              </Button>
              <Button onClick={closePanel}>保存设置</Button>
            </div>
          </DialogContent>
        )

      case "language-settings":
        return (
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-cyan-500" />
                语言设置
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="interface-lang">界面语言</Label>
                <Select defaultValue="zh-CN">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zh-CN">简体中文</SelectItem>
                    <SelectItem value="zh-TW">繁体中文</SelectItem>
                    <SelectItem value="en-US">English</SelectItem>
                    <SelectItem value="ja-JP">日本語</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ai-lang">AI回复语言</Label>
                <Select defaultValue="zh-CN">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zh-CN">简体中文</SelectItem>
                    <SelectItem value="zh-TW">繁体中文</SelectItem>
                    <SelectItem value="en-US">English</SelectItem>
                    <SelectItem value="auto">自动检测</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-translate">自动翻译</Label>
                <Switch id="auto-translate" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={closePanel}>
                取消
              </Button>
              <Button onClick={closePanel}>保存设置</Button>
            </div>
          </DialogContent>
        )

      case "user-profile":
        return (
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <UserCircle className="w-5 h-5 text-blue-500" />
                个人资料
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">用户名</Label>
                <Input id="username" placeholder="请输入用户名" defaultValue="YanYu用户" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">邮箱</Label>
                <Input id="email" type="email" placeholder="请输入邮箱" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">个人简介</Label>
                <Textarea id="bio" placeholder="介绍一下自己..." rows={3} />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={closePanel}>
                取消
              </Button>
              <Button onClick={closePanel}>保存资料</Button>
            </div>
          </DialogContent>
        )

      case "about-us":
        return (
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Info className="w-5 h-5 text-gray-500" />
                关于我们
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  YanYu Cloud³ OS
                </h3>
                <p className="text-gray-600 mt-2">智能交互平台</p>
                <Badge variant="secondary" className="mt-2">
                  v1.0.0
                </Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  YanYu Cloud³ OS 是一个基于人工智能的智能交互平台，致力于为用户提供高效、便捷的数字化体验。
                </p>
                <p className="text-sm text-gray-600">
                  我们的使命是通过先进的AI技术，让每个人都能享受到智能化带来的便利。
                </p>
              </div>
              <div className="border-t pt-4">
                <p className="text-xs text-gray-500">© 2024 YanYu Cloud³ OS. All rights reserved.</p>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button onClick={closePanel}>关闭</Button>
            </div>
          </DialogContent>
        )

      default:
        return (
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>功能开发中</DialogTitle>
            </DialogHeader>
            <div className="py-6 text-center">
              <p className="text-gray-600">该功能正在开发中，敬请期待！</p>
            </div>
            <div className="flex justify-end">
              <Button onClick={closePanel}>关闭</Button>
            </div>
          </DialogContent>
        )
    }
  }

  return (
    <div className="flex items-center gap-4">
      {/* 网络状态指示器 */}
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-100/50 to-pink-100/50 backdrop-blur-sm">
        {networkStatus.isOnline ? (
          <Wifi className="w-4 h-4 text-green-500" />
        ) : (
          <WifiOff className="w-4 h-4 text-red-500" />
        )}
        <span className="text-xs font-medium text-gray-700">{networkStatus.speed}</span>
        {networkStatus.latency > 0 && (
          <Badge variant="secondary" className="text-xs">
            {networkStatus.latency}ms
          </Badge>
        )}
      </div>

      {/* 用户菜单 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 transition-all duration-300"
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <User className="w-4 h-4 text-purple-600" />
            </motion.div>
            <ChevronDown className="w-3 h-3 text-gray-500" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 backdrop-blur-md bg-white/90 border border-purple-200/50">
          <DropdownMenuLabel className="text-purple-700 font-semibold">用户中心</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {userMenuItems.map((item, index) => (
            <DropdownMenuItem
              key={index}
              className="flex items-center gap-3 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 cursor-pointer"
              onClick={() =>
                item.action === "logout" ? alert("退出登录功能") : handleMenuItemClick(item.action as SettingsPanelType)
              }
            >
              <item.icon className={`w-4 h-4 ${item.color}`} />
              <span className="text-gray-700">{item.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 设置菜单 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 transition-all duration-300"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Settings className="w-4 h-4 text-purple-600" />
            </motion.div>
            <ChevronDown className="w-3 h-3 text-gray-500" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 backdrop-blur-md bg-white/90 border border-purple-200/50">
          <DropdownMenuLabel className="text-purple-700 font-semibold">系统设置</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {settingsMenuItems.map((item, index) => (
            <DropdownMenuItem
              key={index}
              className="flex items-center gap-3 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 cursor-pointer"
              onClick={() => handleMenuItemClick(item.action as SettingsPanelType)}
            >
              <item.icon className={`w-4 h-4 ${item.color}`} />
              <span className="text-gray-700">{item.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 帮助菜单 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 transition-all duration-300"
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <HelpCircle className="w-4 h-4 text-purple-600" />
            </motion.div>
            <ChevronDown className="w-3 h-3 text-gray-500" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 backdrop-blur-md bg-white/90 border border-purple-200/50">
          <DropdownMenuLabel className="text-purple-700 font-semibold">帮助支持</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {helpMenuItems.map((item, index) => (
            <DropdownMenuItem
              key={index}
              className="flex items-center gap-3 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 cursor-pointer"
              onClick={() => handleMenuItemClick(item.action as SettingsPanelType)}
            >
              <item.icon className={`w-4 h-4 ${item.color}`} />
              <span className="text-gray-700">{item.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={activePanel !== null} onOpenChange={(open) => !open && closePanel()}>
        {renderSettingsPanel()}
      </Dialog>
    </div>
  )
}

export default TopNavigationMenu
