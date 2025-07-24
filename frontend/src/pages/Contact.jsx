import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  MessageCircle,
  HelpCircle,
  Users,
  ExternalLink
} from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Send us an email and we\'ll respond within 24 hours',
      contact: 'hello@mikelearning.com',
      action: 'mailto:hello@mikelearning.com'
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak with our support team during business hours',
      contact: '+1 (555) 123-4567',
      action: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      description: 'Our headquarters in the heart of Silicon Valley',
      contact: '123 Innovation Drive, San Francisco, CA 94105',
      action: 'https://maps.google.com'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      description: 'We\'re here to help during these hours',
      contact: 'Mon-Fri: 9AM-6PM PST',
      action: null
    }
  ]

  const socialLinks = [
    {
      name: 'Twitter',
      url: 'https://twitter.com/mikelearning',
      description: 'Follow us for updates and tips'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/mikelearning',
      description: 'Connect with us professionally'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/mikelearning',
      description: 'Check out our open source projects'
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/mikelearning',
      description: 'Watch free tutorials and previews'
    }
  ]

  const faqCategories = [
    {
      icon: HelpCircle,
      title: 'General Questions',
      description: 'Common questions about our platform and courses'
    },
    {
      icon: Users,
      title: 'Account & Billing',
      description: 'Help with your account, payments, and subscriptions'
    },
    {
      icon: MessageCircle,
      title: 'Technical Support',
      description: 'Technical issues and troubleshooting'
    }
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about our courses or need support? We're here to help! 
            Reach out to us through any of the channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Send className="h-6 w-6 mr-2 text-primary" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What is this regarding?"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us more about your question or concern..."
                      rows={6}
                      required
                    />
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* FAQ Categories */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-6">Need Quick Help?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {faqCategories.map((category, index) => {
                  const Icon = category.icon
                  return (
                    <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardHeader className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-2 mx-auto">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{category.title}</CardTitle>
                        <CardDescription className="text-sm">
                          {category.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Details */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Multiple ways to reach our team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{info.title}</h4>
                        <p className="text-sm text-muted-foreground mb-1">
                          {info.description}
                        </p>
                        {info.action ? (
                          <a 
                            href={info.action}
                            className="text-sm text-primary hover:underline"
                          >
                            {info.contact}
                          </a>
                        ) : (
                          <p className="text-sm font-medium">{info.contact}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle>Follow Us</CardTitle>
                <CardDescription>
                  Stay connected on social media
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors"
                  >
                    <div>
                      <div className="font-medium">{social.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {social.description}
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </a>
                ))}
              </CardContent>
            </Card>

            {/* Office Hours */}
            <Card>
              <CardHeader>
                <CardTitle>Support Hours</CardTitle>
                <CardDescription>
                  When you can expect responses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Email Support:</span>
                    <span className="font-medium">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Live Chat:</span>
                    <span className="font-medium">9AM-6PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phone Support:</span>
                    <span className="font-medium">Mon-Fri 9AM-6PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Response Time:</span>
                    <span className="font-medium">Within 24 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-12 text-center bg-card/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Need Immediate Help?</h3>
          <p className="text-muted-foreground mb-4">
            For urgent technical issues or account problems, use our live chat feature 
            or call our support hotline during business hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline">
              <MessageCircle className="h-4 w-4 mr-2" />
              Start Live Chat
            </Button>
            <Button>
              <Phone className="h-4 w-4 mr-2" />
              Call Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact

