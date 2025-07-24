import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  Filter, 
  Clock, 
  Users, 
  Star, 
  Play,
  BookOpen,
  TrendingUp
} from 'lucide-react'

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')

  const allCourses = [
    {
      id: 1,
      title: 'Web Development Mastery',
      description: 'Learn modern web development with React, Node.js, and database integration',
      thumbnail: '/src/assets/thumbnails/web_development.png',
      category: 'Development',
      difficulty: 'Beginner',
      duration: '12 weeks',
      students: 2847,
      rating: 4.9,
      stages: 8,
      featured: true
    },
    {
      id: 2,
      title: 'Blog Development',
      description: 'Create engaging blogs with modern CMS and content strategies',
      thumbnail: '/src/assets/thumbnails/blog_development.png',
      category: 'Development',
      difficulty: 'Beginner',
      duration: '6 weeks',
      students: 1523,
      rating: 4.7,
      stages: 5
    },
    {
      id: 3,
      title: 'Trading & Finance',
      description: 'Master trading strategies, technical analysis, and risk management',
      thumbnail: '/src/assets/thumbnails/trading.png',
      category: 'Finance',
      difficulty: 'Intermediate',
      duration: '8 weeks',
      students: 3421,
      rating: 4.8,
      stages: 6,
      featured: true
    },
    {
      id: 4,
      title: 'Blockchain & Web3',
      description: 'Understand blockchain technology, smart contracts, and DeFi',
      thumbnail: '/src/assets/thumbnails/blockchain_web3.png',
      category: 'Technology',
      difficulty: 'Advanced',
      duration: '10 weeks',
      students: 1876,
      rating: 4.6,
      stages: 7
    },
    {
      id: 5,
      title: 'Digital Marketing',
      description: 'Learn SEO, social media marketing, and digital advertising strategies',
      thumbnail: '/src/assets/thumbnails/marketing.png',
      category: 'Marketing',
      difficulty: 'Beginner',
      duration: '8 weeks',
      students: 4123,
      rating: 4.8,
      stages: 6,
      featured: true
    },
    {
      id: 6,
      title: 'Online Writing',
      description: 'Master copywriting, content creation, and freelance writing skills',
      thumbnail: '/src/assets/thumbnails/online_writing.png',
      category: 'Writing',
      difficulty: 'Beginner',
      duration: '6 weeks',
      students: 2341,
      rating: 4.7,
      stages: 5
    },
    {
      id: 7,
      title: 'Transcription Services',
      description: 'Learn professional transcription techniques and tools',
      thumbnail: '/src/assets/thumbnails/transcription.png',
      category: 'Services',
      difficulty: 'Beginner',
      duration: '4 weeks',
      students: 1654,
      rating: 4.5,
      stages: 4
    },
    {
      id: 8,
      title: 'Customer Service Excellence',
      description: 'Develop exceptional customer service and communication skills',
      thumbnail: '/src/assets/thumbnails/customer_service.png',
      category: 'Business',
      difficulty: 'Beginner',
      duration: '5 weeks',
      students: 2987,
      rating: 4.6,
      stages: 5
    },
    {
      id: 9,
      title: 'AI & Machine Learning',
      description: 'Master artificial intelligence, machine learning, and data science',
      thumbnail: '/src/assets/thumbnails/ai.png',
      category: 'Technology',
      difficulty: 'Advanced',
      duration: '16 weeks',
      students: 1923,
      rating: 4.9,
      stages: 10,
      featured: true
    }
  ]

  const categories = ['All', 'Development', 'Technology', 'Finance', 'Marketing', 'Writing', 'Services', 'Business']
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced']

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'All' || course.difficulty === selectedDifficulty
    
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const featuredCourses = allCourses.filter(course => course.featured)

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            All Courses
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our comprehensive collection of courses designed to accelerate your career
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Category:</span>
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Difficulty:</span>
              {difficulties.map(difficulty => (
                <Button
                  key={difficulty}
                  variant={selectedDifficulty === difficulty ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDifficulty(difficulty)}
                >
                  {difficulty}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Courses */}
        {searchTerm === '' && selectedCategory === 'All' && selectedDifficulty === 'All' && (
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <TrendingUp className="h-5 w-5 text-primary mr-2" />
              <h2 className="text-2xl font-bold">Featured Courses</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCourses.map((course) => (
                <Card key={course.id} className="card-hover cursor-pointer">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-yellow-500 text-yellow-900">Featured</Badge>
                    </div>
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="secondary">
                        <Play className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{course.category}</Badge>
                      <Badge variant="outline">{course.difficulty}</Badge>
                    </div>
                    <CardTitle className="text-base line-clamp-2">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                        {course.rating}
                      </div>
                    </div>
                    <Button size="sm" className="w-full" asChild>
                      <Link to={`/courses/${course.id}`}>
                        Start Learning
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Courses */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 text-primary mr-2" />
              <h2 className="text-2xl font-bold">
                {searchTerm || selectedCategory !== 'All' || selectedDifficulty !== 'All' 
                  ? 'Search Results' 
                  : 'All Courses'
                }
              </h2>
              <span className="ml-2 text-muted-foreground">
                ({filteredCourses.length} courses)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="card-hover cursor-pointer">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  {course.featured && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-yellow-500 text-yellow-900">Featured</Badge>
                    </div>
                  )}
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
                  <CardDescription className="line-clamp-2">{course.description}</CardDescription>
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
                  <div className="text-sm text-muted-foreground mb-4">
                    {course.stages} learning stages
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

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No courses found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Courses

