import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowRight, 
  Play, 
  Users, 
  Star, 
  Clock,
  TrendingUp,
  Award,
  BookOpen
} from 'lucide-react'

const Home = () => {
  const featuredCourses = [
    {
      id: 1,
      title: 'Web Development Mastery',
      description: 'Learn modern web development with React, Node.js, and more',
      thumbnail: '/src/assets/thumbnails/web_development.png',
      category: 'Development',
      difficulty: 'Beginner',
      duration: '12 weeks',
      students: 2847,
      rating: 4.9
    },
    {
      id: 2,
      title: 'AI & Machine Learning',
      description: 'Master artificial intelligence and machine learning concepts',
      thumbnail: '/src/assets/thumbnails/ai.png',
      category: 'Technology',
      difficulty: 'Advanced',
      duration: '16 weeks',
      students: 1923,
      rating: 4.8
    },
    {
      id: 3,
      title: 'Trading & Finance',
      description: 'Learn trading strategies and financial market analysis',
      thumbnail: '/src/assets/thumbnails/trading.png',
      category: 'Finance',
      difficulty: 'Intermediate',
      duration: '8 weeks',
      students: 3421,
      rating: 4.7
    }
  ]

  const stats = [
    { icon: Users, label: 'Active Students', value: '50,000+' },
    { icon: BookOpen, label: 'Courses Available', value: '9' },
    { icon: Award, label: 'Completion Rate', value: '94%' },
    { icon: Star, label: 'Average Rating', value: '4.8' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Master New Skills with{' '}
              <span className="gradient-text">Mike Learning</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Unlock your potential with our comprehensive learning platform. 
              From web development to AI, trading to customer service - we have 
              the courses to accelerate your career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/courses">
                  Explore Courses
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Courses
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start your learning journey with our most popular courses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <Card key={course.id} className="card-hover cursor-pointer">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="secondary">
                      <Play className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{course.category}</Badge>
                    <Badge variant="outline">{course.difficulty}</Badge>
                  </div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {course.students.toLocaleString()}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                      {course.rating}
                    </div>
                  </div>
                  <Button className="w-full" asChild>
                    <Link to={`/courses/${course.id}`}>
                      Start Learning
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link to="/courses">
                View All Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Mike Learning?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing the best learning experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-6">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Industry-Relevant Skills</h3>
              <p className="text-muted-foreground">
                Learn skills that are in high demand in today's job market. 
                Our curriculum is designed with industry experts.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-6">
                <Play className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Hands-On Learning</h3>
              <p className="text-muted-foreground">
                Practice what you learn with real-world projects and exercises. 
                Build a portfolio while you study.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-6">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Expert Instructors</h3>
              <p className="text-muted-foreground">
                Learn from industry professionals with years of experience. 
                Get insights from the best in the field.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of students who have transformed their careers with Mike Learning
          </p>
          <Button size="lg" asChild>
            <Link to="/courses">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

export default Home

