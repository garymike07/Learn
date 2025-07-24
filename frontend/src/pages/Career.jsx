import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Users, 
  ArrowRight,
  Briefcase,
  Target,
  BookOpen,
  Award,
  CheckCircle
} from 'lucide-react'

const Career = () => {
  const careerPaths = [
    {
      title: 'Web Developer',
      description: 'Build modern websites and web applications',
      averageSalary: '$75,000 - $120,000',
      timeToLearn: '6-12 months',
      demandLevel: 'High',
      courses: ['Web Development Mastery', 'Blog Development'],
      skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js'],
      jobTitles: ['Frontend Developer', 'Full Stack Developer', 'Web Developer']
    },
    {
      title: 'AI/ML Engineer',
      description: 'Develop artificial intelligence and machine learning solutions',
      averageSalary: '$100,000 - $180,000',
      timeToLearn: '12-18 months',
      demandLevel: 'Very High',
      courses: ['AI & Machine Learning'],
      skills: ['Python', 'TensorFlow', 'Data Science', 'Statistics'],
      jobTitles: ['ML Engineer', 'Data Scientist', 'AI Researcher']
    },
    {
      title: 'Digital Marketer',
      description: 'Drive business growth through digital marketing strategies',
      averageSalary: '$50,000 - $90,000',
      timeToLearn: '3-6 months',
      demandLevel: 'High',
      courses: ['Digital Marketing'],
      skills: ['SEO', 'Social Media', 'Analytics', 'Content Marketing'],
      jobTitles: ['Marketing Specialist', 'SEO Expert', 'Social Media Manager']
    },
    {
      title: 'Blockchain Developer',
      description: 'Build decentralized applications and smart contracts',
      averageSalary: '$90,000 - $150,000',
      timeToLearn: '9-15 months',
      demandLevel: 'High',
      courses: ['Blockchain & Web3'],
      skills: ['Solidity', 'Web3', 'Smart Contracts', 'DeFi'],
      jobTitles: ['Blockchain Developer', 'Smart Contract Developer', 'DeFi Engineer']
    },
    {
      title: 'Content Creator',
      description: 'Create engaging content for various platforms',
      averageSalary: '$40,000 - $80,000',
      timeToLearn: '2-4 months',
      demandLevel: 'Medium',
      courses: ['Online Writing', 'Blog Development'],
      skills: ['Writing', 'SEO', 'Content Strategy', 'Social Media'],
      jobTitles: ['Content Writer', 'Copywriter', 'Blog Writer']
    },
    {
      title: 'Customer Success Manager',
      description: 'Ensure customer satisfaction and retention',
      averageSalary: '$55,000 - $95,000',
      timeToLearn: '1-3 months',
      demandLevel: 'Medium',
      courses: ['Customer Service Excellence'],
      skills: ['Communication', 'Problem Solving', 'CRM', 'Analytics'],
      jobTitles: ['Customer Success Manager', 'Account Manager', 'Support Specialist']
    }
  ]

  const industryTrends = [
    {
      trend: 'Remote Work Growth',
      description: 'Remote and hybrid work opportunities continue to expand across all industries',
      impact: 'High'
    },
    {
      trend: 'AI Integration',
      description: 'Companies are rapidly adopting AI tools to improve efficiency and innovation',
      impact: 'Very High'
    },
    {
      trend: 'Sustainability Focus',
      description: 'Green technology and sustainable practices are becoming business priorities',
      impact: 'Medium'
    },
    {
      trend: 'Digital Transformation',
      description: 'Businesses are accelerating their digital transformation initiatives',
      impact: 'High'
    }
  ]

  const getDemandColor = (level) => {
    switch (level) {
      case 'Very High': return 'bg-green-500'
      case 'High': return 'bg-blue-500'
      case 'Medium': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Career Guidance
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover high-demand career paths and get personalized recommendations 
            based on your interests and our course offerings
          </p>
        </div>

        {/* Industry Trends */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <TrendingUp className="h-6 w-6 mr-2 text-primary" />
            Industry Trends 2025
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industryTrends.map((trend, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{trend.trend}</CardTitle>
                    <Badge variant={trend.impact === 'Very High' ? 'default' : 'secondary'}>
                      {trend.impact} Impact
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{trend.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Career Paths */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Briefcase className="h-6 w-6 mr-2 text-primary" />
            Career Paths
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {careerPaths.map((career, index) => (
              <Card key={index} className="card-hover">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl">{career.title}</CardTitle>
                    <div className={`w-3 h-3 rounded-full ${getDemandColor(career.demandLevel)}`} />
                  </div>
                  <CardDescription>{career.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                      <div>
                        <div className="font-medium">Salary Range</div>
                        <div className="text-muted-foreground">{career.averageSalary}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-blue-500" />
                      <div>
                        <div className="font-medium">Time to Learn</div>
                        <div className="text-muted-foreground">{career.timeToLearn}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="font-medium mb-2 flex items-center">
                      <Target className="h-4 w-4 mr-2" />
                      Key Skills
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {career.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="font-medium mb-2 flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Recommended Courses
                    </div>
                    <div className="space-y-1">
                      {career.courses.map((course, courseIndex) => (
                        <div key={courseIndex} className="text-sm text-muted-foreground flex items-center">
                          <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                          {course}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="font-medium mb-2">Common Job Titles</div>
                    <div className="text-sm text-muted-foreground">
                      {career.jobTitles.join(' • ')}
                    </div>
                  </div>

                  <Button className="w-full mt-4">
                    Start Learning Path
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Career Assessment CTA */}
        <section className="text-center bg-card/30 rounded-lg p-8">
          <Award className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">
            Not Sure Which Path to Choose?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Take our career assessment quiz to get personalized recommendations 
            based on your interests, skills, and career goals.
          </p>
          <Button size="lg">
            Take Career Assessment
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </section>

        {/* Success Stories */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Users className="h-6 w-6 mr-2 text-primary" />
            Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Sarah Johnson</CardTitle>
                    <CardDescription>Web Developer at Google</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  "Mike Learning's Web Development course helped me transition from 
                  marketing to tech. I landed my dream job at Google within 8 months!"
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Michael Chen</CardTitle>
                    <CardDescription>AI Engineer at Microsoft</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  "The AI course was comprehensive and practical. I went from 
                  zero knowledge to building ML models in production."
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Emily Rodriguez</CardTitle>
                    <CardDescription>Freelance Digital Marketer</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  "The marketing course gave me the skills to start my own 
                  agency. I'm now earning 3x more than my previous job."
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Career

