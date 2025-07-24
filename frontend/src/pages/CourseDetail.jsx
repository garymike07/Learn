import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  CheckCircle, 
  Lock,
  ArrowLeft,
  BookOpen,
  Target,
  Award,
  Video,
  User
} from 'lucide-react'

const CourseDetail = () => {
  const { id } = useParams()
  const [isEnrolling, setIsEnrolling] = useState(false)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [enrolledStages, setEnrolledStages] = useState([0]) // Start with first stage unlocked
  const [showPreview, setShowPreview] = useState(false)

  const getYouTubeThumbnail = (videoId) => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  }

  const handleEnrollCourse = async () => {
    try {
      setIsEnrolling(true)
      const response = await fetch(`http://localhost:5000/api/courses/${id}/enroll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (response.ok) {
        setIsEnrolled(true)
        alert('Successfully enrolled in the course!')
      } else {
        throw new Error('Enrollment failed')
      }
    } catch (error) {
      console.error('Enrollment failed:', error)
      alert('Failed to enroll in the course. Please try again.')
    } finally {
      setIsEnrolling(false)
    }
  }
  
  // Mock course data - in real app, this would come from API
  const course = {
    id: parseInt(id),
    title: 'Web Development Mastery',
    description: 'Learn modern web development with React, Node.js, and database integration. This comprehensive course will take you from beginner to advanced level.',
    category: 'Development',
    difficulty: 'Beginner',
    duration: '12 weeks',
    students: 2847,
    rating: 4.9,
    instructor: 'Mike Johnson',
    thumbnail: '/api/placeholder/800/450',
    previewVideoId: 'dQw4w9WgXcQ', // YouTube video ID for preview
    language: 'English',
    lastUpdated: '2024-12-01',
    stages: [
      {
        id: 1,
        title: 'Introduction to Web Development',
        description: 'Get started with the basics of web development',
        duration: '2 hours',
        videos: [
          { id: 1, title: 'What is Web Development?', duration: '15:30', youtubeId: 'dQw4w9WgXcQ' },
          { id: 2, title: 'Setting Up Your Environment', duration: '22:45', youtubeId: 'dQw4w9WgXcQ' },
          { id: 3, title: 'Your First HTML Page', duration: '18:20', youtubeId: 'dQw4w9WgXcQ' }
        ]
      },
      {
        id: 2,
        title: 'HTML Fundamentals',
        description: 'Master HTML structure and semantic elements',
        duration: '3 hours',
        videos: [
          { id: 4, title: 'HTML Structure and Tags', duration: '25:15', youtubeId: 'dQw4w9WgXcQ' },
          { id: 5, title: 'Forms and Input Elements', duration: '30:20', youtubeId: 'dQw4w9WgXcQ' },
          { id: 6, title: 'Semantic HTML', duration: '20:10', youtubeId: 'dQw4w9WgXcQ' }
        ]
      },
      {
        id: 3,
        title: 'CSS Styling',
        description: 'Learn CSS for beautiful and responsive designs',
        duration: '4 hours',
        videos: [
          { id: 7, title: 'CSS Basics and Selectors', duration: '28:30', youtubeId: 'dQw4w9WgXcQ' },
          { id: 8, title: 'Flexbox Layout', duration: '35:45', youtubeId: 'dQw4w9WgXcQ' },
          { id: 9, title: 'CSS Grid System', duration: '32:15', youtubeId: 'dQw4w9WgXcQ' }
        ]
      },
      {
        id: 4,
        title: 'JavaScript Fundamentals',
        description: 'Add interactivity with JavaScript',
        duration: '5 hours',
        videos: [
          { id: 10, title: 'JavaScript Basics', duration: '40:20', youtubeId: 'dQw4w9WgXcQ' },
          { id: 11, title: 'DOM Manipulation', duration: '35:30', youtubeId: 'dQw4w9WgXcQ' },
          { id: 12, title: 'Event Handling', duration: '28:45', youtubeId: 'dQw4w9WgXcQ' }
        ]
      }
    ],
    learningObjectives: [
      'Build responsive websites from scratch',
      'Master HTML, CSS, and JavaScript',
      'Understand modern web development tools',
      'Create interactive user interfaces',
      'Deploy websites to production'
    ],
    requirements: [
      'Basic computer skills',
      'No prior programming experience needed',
      'A computer with internet connection',
      'Willingness to learn and practice'
    ]
  }

  const isStageUnlocked = (stageId) => {
    return enrolledStages.includes(stageId)
  }

  const handleEnrollStage = (stageId) => {
    if (!enrolledStages.includes(stageId)) {
      setEnrolledStages([...enrolledStages, stageId])
    }
  }

  const completedVideos = 5 // Mock progress
  const totalVideos = course.stages.reduce((total, stage) => total + stage.videos.length, 0)
  const progressPercentage = (completedVideos / totalVideos) * 100

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/courses">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="mb-8">
              <div className="aspect-video relative overflow-hidden rounded-lg mb-6">
                {showPreview ? (
                  <div className="relative w-full h-full">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${course.previewVideoId}?autoplay=1`}
                      title="Course Preview"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0"
                    ></iframe>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70"
                      onClick={() => setShowPreview(false)}
                    >
                      ✕
                    </Button>
                  </div>
                ) : (
                  <>
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Button size="lg" onClick={() => setShowPreview(true)}>
                        <Play className="h-6 w-6 mr-2" />
                        Watch Preview
                      </Button>
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{course.category}</Badge>
                <Badge variant="outline">{course.difficulty}</Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{course.description}</p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {course.duration}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {course.students.toLocaleString()} students
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                  {course.rating} rating
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  {course.stages.length} stages
                </div>
              </div>
            </div>

            {/* Course Content Tabs */}
            <Tabs defaultValue="curriculum" className="w-full">
              <TabsList>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="overview">Overview</TabsTrigger>
              </TabsList>

              <TabsContent value="curriculum" className="space-y-4">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Course Progress</h3>
                  <div className="flex items-center gap-4">
                    <Progress value={progressPercentage} className="flex-1" />
                    <span className="text-sm text-muted-foreground">
                      {completedVideos}/{totalVideos} videos completed
                    </span>
                  </div>
                </div>

                {course.stages.map((stage, index) => {
                  const isUnlocked = isStageUnlocked(stage.id)
                  return (
                    <Card key={stage.id} className={`${!isUnlocked ? 'opacity-60' : ''}`}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {isUnlocked ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <Lock className="h-5 w-5 text-muted-foreground" />
                            )}
                            <div>
                              <CardTitle className="text-lg">
                                Stage {index + 1}: {stage.title}
                              </CardTitle>
                              <CardDescription>{stage.description}</CardDescription>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {stage.duration}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {stage.videos.map((video, videoIndex) => (
                            <div 
                              key={video.id} 
                              className={`flex items-center justify-between p-3 rounded-lg ${
                                isUnlocked ? 'bg-muted/50 hover:bg-muted cursor-pointer' : 'bg-muted/20'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className="relative w-16 h-12 rounded overflow-hidden">
                                  <img 
                                    src={getYouTubeThumbnail(video.youtubeId)} 
                                    alt={video.title}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                    <Play className="h-3 w-3 text-white" />
                                  </div>
                                </div>
                                <div>
                                  <div className="font-medium">{video.title}</div>
                                  <div className="text-sm text-muted-foreground">
                                    Video {videoIndex + 1} • {video.duration}
                                  </div>
                                </div>
                              </div>
                              {isUnlocked && (
                                <Button size="sm" variant="ghost">
                                  <Play className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                        {!isUnlocked && (
                          <div className="mt-4 pt-4 border-t">
                            <Button 
                              onClick={() => handleEnrollStage(stage.id)}
                              disabled={index > 0 && !isStageUnlocked(index)}
                            >
                              Unlock Stage {index + 1}
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </TabsContent>

              <TabsContent value="overview" className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    What You'll Learn
                  </h3>
                  <ul className="space-y-2">
                    {course.learningObjectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Requirements</h3>
                  <ul className="space-y-2">
                    {course.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                        <span>{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-2xl">Start Learning</CardTitle>
                <CardDescription>
                  Join {course.students.toLocaleString()} students already enrolled
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={handleEnrollCourse}
                  disabled={isEnrolling || isEnrolled}
                >
                  {isEnrolling ? 'Enrolling...' : isEnrolled ? 'Enrolled' : 'Enroll Now - Free'}
                </Button>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Difficulty:</span>
                    <span>{course.difficulty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Language:</span>
                    <span>{course.language}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Updated:</span>
                    <span>{new Date(course.lastUpdated).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Award className="h-4 w-4 mr-2" />
                    What's Included
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Lifetime access
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Mobile and desktop access
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Certificate of completion
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Progress tracking
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail

