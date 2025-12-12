"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Shield,
  Menu,
  Building2,
  Users,
  FileText,
  BookOpen,
  Zap,
  BarChart3,
  Settings,
  HelpCircle,
  ArrowRight,
  DollarSign,
  Phone,
  Info,
  Star,
  Briefcase,
  Globe,
  MessageSquare,
  PlayCircle,
  Calendar,
  UserCheck,
  Award,
} from "lucide-react"
import { useAuth } from "@/lib/auth"
import { usePathname } from "next/navigation"

interface NavigationProps {
  onStartTrial?: () => void
}

export function Navigation({ onStartTrial }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const pathname = usePathname()

  // Don't show authenticated actions on public marketing pages
  const isPublicPage =
    pathname === "/landing" ||
    pathname === "/" ||
    pathname.startsWith("/about") ||
    pathname.startsWith("/contact") ||
    pathname.startsWith("/features") ||
    pathname.startsWith("/pricing") ||
    pathname.startsWith("/resources")

  const productFeatures = [
    {
      title: "Worker Management",
      description: "Track Section 3 workers and certifications",
      href: "/features/workers",
      icon: Users,
    },
    {
      title: "Contractor Portal",
      description: "Manage contractor compliance and action plans",
      href: "/features/contractors",
      icon: Building2,
    },
    {
      title: "AI Email Triage",
      description: "Automated email processing and responses",
      href: "/features/ai-triage",
      icon: Zap,
    },
    {
      title: "Analytics & Reporting",
      description: "Comprehensive compliance analytics",
      href: "/features/analytics",
      icon: BarChart3,
    },
  ]

  const pricingOptions = [
    {
      title: "Starter Plan",
      description: "Perfect for small organizations getting started",
      href: "/pricing/starter",
      icon: Star,
    },
    {
      title: "Professional Plan",
      description: "Most popular choice for growing organizations",
      href: "/pricing/professional",
      icon: Briefcase,
    },
    {
      title: "Enterprise Plan",
      description: "Advanced features for large organizations",
      href: "/pricing/enterprise",
      icon: Globe,
    },
    {
      title: "Request Demo",
      description: "See the platform in action",
      href: "/pricing/request-demo",
      icon: PlayCircle,
    },
  ]

  const resourcesItems = [
    {
      title: "Knowledge Base",
      description: "Comprehensive guides and documentation",
      href: "/resources/knowledge-base",
      icon: BookOpen,
    },
    {
      title: "Section 3 Guide",
      description: "Complete guide to HUD Section 3 requirements",
      href: "/resources/section3-guide",
      icon: FileText,
    },
    {
      title: "Best Practices",
      description: "Industry best practices and case studies",
      href: "/resources/best-practices",
      icon: Settings,
    },
    {
      title: "Support Center",
      description: "Get help and technical support",
      href: "/help",
      icon: HelpCircle,
    },
  ]

  const aboutItems = [
    {
      title: "Our Story",
      description: "How we started and our mission",
      href: "/about/story",
      icon: Info,
    },
    {
      title: "Team",
      description: "Meet our compliance experts",
      href: "/about/team",
      icon: Users,
    },
    {
      title: "Mission & Values",
      description: "What drives us forward",
      href: "/about/mission",
      icon: Award,
    },
    {
      title: "Careers",
      description: "Join our growing team",
      href: "/about/careers",
      icon: UserCheck,
    },
  ]

  const contactItems = [
    {
      title: "Sales Inquiry",
      description: "Speak with our sales team",
      href: "/contact/sales",
      icon: Phone,
    },
    {
      title: "Support",
      description: "Get technical help and assistance",
      href: "/contact/support",
      icon: HelpCircle,
    },
    {
      title: "Schedule Demo",
      description: "See the platform in action",
      href: "/contact/demo",
      icon: Calendar,
    },
    {
      title: "Partnerships",
      description: "Partner with us",
      href: "/contact/partners",
      icon: MessageSquare,
    },
  ]

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo - Links to landing page for wrap-around navigation */}
          <Link href="/landing" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl text-gray-900">Rapid Compliance</h1>
              <p className="text-xs text-gray-500">Section 3 Management Platform</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Product */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700 hover:text-gray-900">Product</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[500px] grid-cols-2">
                      <div className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-500 to-green-600 p-6 no-underline outline-none focus:shadow-md"
                            href="/features"
                          >
                            <Shield className="h-6 w-6 text-white" />
                            <div className="mb-2 mt-4 text-lg font-medium text-white">Platform Overview</div>
                            <p className="text-sm leading-tight text-blue-100">
                              Complete Section 3 compliance management solution with AI-powered automation
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                      {productFeatures.map((feature) => (
                        <NavigationMenuLink key={feature.title} asChild>
                          <Link
                            href={feature.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="flex items-center gap-2">
                              <feature.icon className="h-4 w-4" />
                              <div className="text-sm font-medium leading-none">{feature.title}</div>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {feature.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Pricing */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700 hover:text-gray-900">Pricing</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[500px] grid-cols-2">
                      <div className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-500 to-green-600 p-6 no-underline outline-none focus:shadow-md"
                            href="/pricing"
                          >
                            <DollarSign className="h-6 w-6 text-white" />
                            <div className="mb-2 mt-4 text-lg font-medium text-white">Simple Pricing</div>
                            <p className="text-sm leading-tight text-blue-100">
                              Transparent pricing plans that scale with your organization's needs
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                      {pricingOptions.map((option) => (
                        <NavigationMenuLink key={option.title} asChild>
                          <Link
                            href={option.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="flex items-center gap-2">
                              <option.icon className="h-4 w-4" />
                              <div className="text-sm font-medium leading-none">{option.title}</div>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {option.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Resources */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700 hover:text-gray-900">Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[500px] grid-cols-2">
                      <div className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-500 to-green-600 p-6 no-underline outline-none focus:shadow-md"
                            href="/resources"
                          >
                            <BookOpen className="h-6 w-6 text-white" />
                            <div className="mb-2 mt-4 text-lg font-medium text-white">Learning Center</div>
                            <p className="text-sm leading-tight text-blue-100">
                              Comprehensive resources to help you succeed with Section 3 compliance
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                      {resourcesItems.map((resource) => (
                        <NavigationMenuLink key={resource.title} asChild>
                          <Link
                            href={resource.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="flex items-center gap-2">
                              <resource.icon className="h-4 w-4" />
                              <div className="text-sm font-medium leading-none">{resource.title}</div>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {resource.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* About */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700 hover:text-gray-900">About</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[500px] grid-cols-2">
                      <div className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-500 to-green-600 p-6 no-underline outline-none focus:shadow-md"
                            href="/about"
                          >
                            <Info className="h-6 w-6 text-white" />
                            <div className="mb-2 mt-4 text-lg font-medium text-white">Our Company</div>
                            <p className="text-sm leading-tight text-blue-100">
                              Learn about our mission to simplify Section 3 compliance management
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                      {aboutItems.map((item) => (
                        <NavigationMenuLink key={item.title} asChild>
                          <Link
                            href={item.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="flex items-center gap-2">
                              <item.icon className="h-4 w-4" />
                              <div className="text-sm font-medium leading-none">{item.title}</div>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {item.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Contact */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700 hover:text-gray-900">Contact</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[500px] grid-cols-2">
                      <div className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-500 to-green-600 p-6 no-underline outline-none focus:shadow-md"
                            href="/contact"
                          >
                            <Phone className="h-6 w-6 text-white" />
                            <div className="mb-2 mt-4 text-lg font-medium text-white">Get in Touch</div>
                            <p className="text-sm leading-tight text-blue-100">
                              We're here to help with your Section 3 compliance needs
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                      {contactItems.map((item) => (
                        <NavigationMenuLink key={item.title} asChild>
                          <Link
                            href={item.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="flex items-center gap-2">
                              <item.icon className="h-4 w-4" />
                              <div className="text-sm font-medium leading-none">{item.title}</div>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {item.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user && !isPublicPage ? (
              <div className="flex items-center gap-4">
                <Button variant="ghost" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button variant="ghost" onClick={logout} className="text-gray-600 hover:text-gray-700 hover:bg-gray-50">
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
                  asChild
                >
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                  onClick={onStartTrial}
                >
                  Start Free Trial
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between py-4 border-b">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-bold text-lg">Rapid Compliance</span>
                  </div>
                </div>

                <nav className="flex-1 py-6">
                  <div className="space-y-6">
                    {/* Product Section */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Product</h3>
                      <div className="space-y-2">
                        <Link
                          href="/features"
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <Shield className="h-4 w-4 text-gray-600" />
                          <div>
                            <div className="font-medium text-sm">Platform Overview</div>
                            <div className="text-xs text-gray-500">Complete compliance solution</div>
                          </div>
                        </Link>
                        {productFeatures.map((feature) => (
                          <Link
                            key={feature.title}
                            href={feature.href}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            <feature.icon className="h-4 w-4 text-gray-600" />
                            <div>
                              <div className="font-medium text-sm">{feature.title}</div>
                              <div className="text-xs text-gray-500">{feature.description}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Pricing Section */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Pricing</h3>
                      <div className="space-y-2">
                        <Link
                          href="/pricing"
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <DollarSign className="h-4 w-4 text-gray-600" />
                          <div>
                            <div className="font-medium text-sm">All Plans</div>
                            <div className="text-xs text-gray-500">Compare pricing options</div>
                          </div>
                        </Link>
                        {pricingOptions.map((option) => (
                          <Link
                            key={option.title}
                            href={option.href}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            <option.icon className="h-4 w-4 text-gray-600" />
                            <div>
                              <div className="font-medium text-sm">{option.title}</div>
                              <div className="text-xs text-gray-500">{option.description}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Resources */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Resources</h3>
                      <div className="space-y-2">
                        <Link
                          href="/resources"
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <BookOpen className="h-4 w-4 text-gray-600" />
                          <div>
                            <div className="font-medium text-sm">All Resources</div>
                            <div className="text-xs text-gray-500">Browse all resources</div>
                          </div>
                        </Link>
                        {resourcesItems.map((resource) => (
                          <Link
                            key={resource.title}
                            href={resource.href}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            <resource.icon className="h-4 w-4 text-gray-600" />
                            <div>
                              <div className="font-medium text-sm">{resource.title}</div>
                              <div className="text-xs text-gray-500">{resource.description}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* About */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">About</h3>
                      <div className="space-y-2">
                        <Link
                          href="/about"
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <Info className="h-4 w-4 text-gray-600" />
                          <div>
                            <div className="font-medium text-sm">About Us</div>
                            <div className="text-xs text-gray-500">Learn about our company</div>
                          </div>
                        </Link>
                        {aboutItems.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            <item.icon className="h-4 w-4 text-gray-600" />
                            <div>
                              <div className="font-medium text-sm">{item.title}</div>
                              <div className="text-xs text-gray-500">{item.description}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Contact */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Contact</h3>
                      <div className="space-y-2">
                        <Link
                          href="/contact"
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <Phone className="h-4 w-4 text-gray-600" />
                          <div>
                            <div className="font-medium text-sm">Contact Us</div>
                            <div className="text-xs text-gray-500">Get in touch</div>
                          </div>
                        </Link>
                        {contactItems.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            <item.icon className="h-4 w-4 text-gray-600" />
                            <div>
                              <div className="font-medium text-sm">{item.title}</div>
                              <div className="text-xs text-gray-500">{item.description}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </nav>

                {/* Mobile CTA */}
                <div className="border-t pt-6 space-y-3">
                  {user && !isPublicPage ? (
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full bg-transparent" asChild>
                        <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                          Dashboard
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full text-gray-600 hover:text-gray-700 hover:bg-gray-50 bg-transparent"
                        onClick={() => {
                          setIsOpen(false)
                          logout()
                        }}
                      >
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
                        asChild
                      >
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                          Sign In
                        </Link>
                      </Button>
                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                        onClick={() => {
                          setIsOpen(false)
                          onStartTrial?.()
                        }}
                      >
                        Start Free Trial
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default Navigation
