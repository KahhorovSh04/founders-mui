import React, { useState } from 'react'
import CourseCard from './CourseCard'
import { Button, Container, Grid, Typography, Box, Stack } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
// DB
import courses from '../db/courses'

const Courses = ({
  setCurrentCourse,
  setOpenModal,
  isMobile,
  isTablet,
  language,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const toggleCourses = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <Box id='courses' bgcolor='info.light' color='info.contrastText' pb={8}>
      <Container>
        <Typography py={4} variant='h2' color='secondary' fontWeight={700}>
          {language.courses.heading}
        </Typography>
        <Grid m='auto' container spacing={isMobile ? 0 : isTablet ? 0 : 4}>
          {courses.map((course, ind) =>
            ind <= (isMobile || isTablet ? 1 : 2) ? (
              <CourseCard
                setOpenModal={setOpenModal}
                setCurrentCourse={setCurrentCourse}
                course={course}
                key={ind}
              />
            ) : (
              <CourseCard
                setOpenModal={setOpenModal}
                setCurrentCourse={setCurrentCourse}
                course={course}
                key={ind}
                isExpanded={isExpanded}
                extra={true}
                lang={language.lang}
              />
            )
          )}
        </Grid>
        {courses.length > (isMobile ? 2 : 3) && (
          <Stack alignItems='center' justifyContent='center'>
            <Button variant='contained' onClick={(e) => toggleCourses(e)}>
              <Typography variant='span' fontSize='1.4rem'>
                {isExpanded
                  ? language.courses.btn.collapse
                  : language.courses.btn.expand}
              </Typography>
              {isExpanded ? (
                <KeyboardArrowUpIcon fontSize='large' />
              ) : (
                <KeyboardArrowDownIcon fontSize='large' />
              )}
            </Button>
          </Stack>
        )}
      </Container>
    </Box>
  )
}

export default Courses
