import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { pageTitle } from '../../helper'
import Button from '../Button'
import Cta from '../Cta'
import PageHeading from '../PageHeading'
import Div from '../Div'
import SectionHeading from '../SectionHeading'
import Spacing from '../Spacing'

const projects = [
  {
    id: '1',
    title: 'Graffiti wall artwork',
    subtitle: 'Creative',
    img: '/images/portfolio_details_1.jpeg',
    category: 'Artwork',
    location: 'United Kingdom',
    software: 'Adobe Illustrator',
    date: '14-Aug-2022',
    client: 'Andreo Bowla',
    description: [
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium voltire doloremque laudantium...',
      'Ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora...'
    ]
  },
  {
    id: '2',
    title: 'Product Packaging Design',
    subtitle: 'Design',
    img: '/images/portfolio_details_1.jpeg', // same image replicated
    category: 'Packaging',
    location: 'Germany',
    software: 'Photoshop',
    date: '21-Dec-2022',
    client: 'Clara Denson',
    description: [
      'Designed eco-friendly packaging for a skincare brand with a minimalist concept...',
      'Focused on customer experience and sustainable materials throughout the design.'
    ]
  },
  {
    id: '3',
    title: 'Mobile App UI/UX',
    subtitle: 'Development',
    img: '/images/portfolio_details_1.jpeg',
    category: 'App Design',
    location: 'USA',
    software: 'Figma',
    date: '10-Mar-2023',
    client: 'Techfinity Inc.',
    description: [
      'Crafted user-centered mobile interfaces for a food delivery app...',
      'Seamless user journeys and modern design language were key highlights.'
    ]
  }
]

export default function PortfolioDetailsPage() {
  const { portfolioDetailsId } = useParams()
  const navigate = useNavigate()
  const currentIndex = projects.findIndex(p => p.id === portfolioDetailsId)
  const project = projects[currentIndex]

  useEffect(() => {
    pageTitle('Product Portfolio')
    window.scrollTo(0, 0)
  }, [portfolioDetailsId])

  if (!project) return <p>Project not found</p>

  const prevProjectId = projects[(currentIndex - 1 + projects.length) % projects.length].id
  const nextProjectId = projects[(currentIndex + 1) % projects.length].id

  return (
    <>
      <PageHeading 
        title='Product Portfolio'
        bgSrc='/images/service_hero_bg.jpeg'
        pageLinkText={`Project ${portfolioDetailsId}`}
      />
      <Spacing lg='150' md='80'/>
      <Div className="container">
        <img src={project.img} alt="Details" className="cs-radius_15 w-100" />
        <Spacing lg='90' md='40'/>
        <Div className="row">
          <Div className="col-lg-6">
            <SectionHeading 
              title={project.title} 
              subtitle={project.subtitle} 
            >
              <Spacing lg='40' md='20'/>
              {project.description.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </SectionHeading>
          </Div>
          <Div className="col-lg-5 offset-lg-1">
            <Spacing lg='60' md='40'/>
            <h2 className='cs-font_30 cs-font_26_sm cs-m0'>Project Info -</h2>
            <Spacing lg='50' md='30'/>
            <Div className="row">
              <Div className="col-6">
                <h3 className='cs-accent_color cs-font_22 cs-font_18_sm cs-m0'>Category:</h3>
                <p className='cs-m0'>{project.category}</p>
                <Spacing lg='30' md='30'/>
              </Div>
              <Div className="col-6">
                <h3 className='cs-accent_color cs-font_22 cs-font_18_sm cs-m0'>Location:</h3>
                <p className='cs-m0'>{project.location}</p>
                <Spacing lg='30' md='30'/>
              </Div>
              <Div className="col-6">
                <h3 className='cs-accent_color cs-font_22 cs-font_18_sm cs-m0'>Software:</h3>
                <p className='cs-m0'>{project.software}</p>
                <Spacing lg='30' md='30'/>
              </Div>
              <Div className="col-6">
                <h3 className='cs-accent_color cs-font_22 cs-font_18_sm cs-m0'>Dated:</h3>
                <p className='cs-m0'>{project.date}</p>
                <Spacing lg='30' md='30'/>
              </Div>
              <Div className="col-6">
                <h3 className='cs-accent_color cs-font_22 cs-font_18_sm cs-m0'>Client:</h3>
                <p className='cs-m0'>{project.client}</p>
                <Spacing lg='30' md='30'/>
              </Div>
            </Div>
          </Div>
        </Div>
        <Spacing lg='65' md='10'/>
        <Div className="cs-page_navigation cs-center">
          <Div>
            <Button btnLink={`/portfolio/${prevProjectId}`} btnText='Prev Project' variant='cs-type1'/>
          </Div>
          <Div>
            <Button btnLink={`/portfolio/${nextProjectId}`} btnText='Next Project'/>
          </Div>
        </Div>
      </Div>
      <Spacing lg='145' md='80'/>
      <Cta 
        title='agency@arino.com' 
        bgSrc='/images/cta_bg_2.jpeg'
        variant='rounded-0'
      />
    </>
  )
}
