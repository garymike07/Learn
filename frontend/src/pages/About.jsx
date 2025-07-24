import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Target, 
  Award, 
  Heart,
  BookOpen,
  TrendingUp,
  Globe,
  Zap,
  CheckCircle,
  Star
} from 'lucide-react'

const About = () => {
  const stats = [
    { icon: Users, label: 'Students Worldwide', value: '50,000+' },
    { icon: BookOpen, label: 'Courses Available', value: '9' },
    { icon: Award, label: 'Completion Rate', value: '94%' },
    { icon: Star, label: 'Average Rating', value: '4.8/5' }
  ]

  const values = [
    {
      icon: Target,
      title: 'Quality Education',
      description: 'We believe in providing high-quality, practical education that prepares students for real-world challenges.'
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Learning should be accessible to everyone, regardless of background or location. We make education affordable and available.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We continuously update our curriculum to reflect the latest industry trends and technological advancements.'
    },
    {
      icon: Heart,
      title: 'Community',
      description: 'We foster a supportive learning community where students can connect, collaborate, and grow together.'
    }
  ]

  const team = [
    {
      name: 'Mike Johnson',
      role: 'Founder & Lead Instructor',
      bio: 'Former Google engineer with 10+ years of experience in web development and AI.',
      expertise: ['Web Development', 'AI/ML', 'System Design']
    },
    {
      name: 'Sarah Chen',
      role: 'Head of Curriculum',
      bio: 'Education specialist with expertise in creating engaging learning experiences.',
      expertise: ['Curriculum Design', 'Learning Psychology', 'Assessment']
    },
    {
      name: 'David Rodriguez',
      role: 'Marketing Instructor',
      bio: 'Digital marketing expert who has helped 100+ businesses grow online.',
      expertise: ['Digital Marketing', 'SEO', 'Social Media']
    },
    {
      name: 'Lisa Wang',
      role: 'Student Success Manager',
      bio: 'Dedicated to ensuring every student achieves their learning goals.',
      expertise: ['Student Support', 'Career Guidance', 'Mentoring']
    }
  ]

  const milestones = [
    {
      year: '2020',
      title: 'Mike Learning Founded',
      description: 'Started with a vision to make quality tech education accessible to everyone.'
    },
    {
      year: '2021',
      title: 'First 1,000 Students',
      description: 'Reached our first major milestone with students from 25 countries.'
    },
    {
      year: '2022',
      title: 'Course Expansion',
      description: 'Expanded from 3 to 9 comprehensive courses covering diverse tech skills.'
    },
    {
      year: '2023',
      title: '10,000 Graduates',
      description: 'Celebrated 10,000 successful course completions with 95% satisfaction rate.'
    },
    {
      year: '2024',
      title: 'Global Recognition',
      description: 'Received industry awards for innovation in online education.'
    },
    {
      year: '2025',
      title: '50,000+ Students',
      description: 'Continuing to grow and impact lives worldwide with quality education.'
    }
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About Mike Learning
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're on a mission to democratize quality tech education and empower 
            individuals to build successful careers in the digital age.
          </p>
        </div>

        {/* Stats */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Target className="h-6 w-6 mr-2 text-primary" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To provide accessible, high-quality tech education that empowers 
                  individuals to transform their careers and lives. We believe that 
                  everyone deserves the opportunity to learn valuable skills and 
                  succeed in the digital economy, regardless of their background 
                  or circumstances.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <TrendingUp className="h-6 w-6 mr-2 text-primary" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To become the world's leading platform for practical tech education, 
                  where millions of learners can acquire in-demand skills, build 
                  meaningful careers, and contribute to a more innovative and 
                  inclusive digital future.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 mx-auto">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index}>
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Expertise:</div>
                    <div className="flex flex-wrap gap-1">
                      {member.expertise.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                      {milestone.year.slice(-2)}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-0.5 h-16 bg-border mt-4" />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{milestone.title}</h3>
                      <Badge variant="outline">{milestone.year}</Badge>
                    </div>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16 bg-card/30 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Mike Learning?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Industry-Relevant Curriculum</h4>
                  <p className="text-sm text-muted-foreground">
                    Our courses are designed with input from industry professionals 
                    and updated regularly to reflect current market demands.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Hands-On Learning</h4>
                  <p className="text-sm text-muted-foreground">
                    Learn by doing with practical projects, real-world scenarios, 
                    and interactive exercises that build your portfolio.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Expert Instructors</h4>
                  <p className="text-sm text-muted-foreground">
                    Learn from experienced professionals who have worked at 
                    top companies and understand what employers are looking for.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Flexible Learning</h4>
                  <p className="text-sm text-muted-foreground">
                    Study at your own pace with lifetime access to course materials 
                    and the ability to learn from anywhere.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Career Support</h4>
                  <p className="text-sm text-muted-foreground">
                    Get guidance on career transitions, resume building, and 
                    interview preparation to help you land your dream job.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Community Support</h4>
                  <p className="text-sm text-muted-foreground">
                    Join a vibrant community of learners and professionals who 
                    support each other's growth and success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students who have transformed their careers with Mike Learning. 
            Start your learning journey today and unlock your potential.
          </p>
          <Button size="lg">
            Explore Courses
          </Button>
        </section>
      </div>
    </div>
  )
}

export default About

