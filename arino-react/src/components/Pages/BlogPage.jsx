import React, { useEffect } from "react";
import { pageTitle } from "../../helper";
import Cta from "../Cta";
import PageHeading from "../PageHeading";
import Spacing from "../Spacing";
import Div from "../Div";
import { Grid, Box, Typography } from "@mui/material";

// Import images from src/blogimages
import blogImage1 from "../../blogimages/blog_image1.1.jpg";
import blogImage2 from "../../blogimages/blog_image2.webp";
import blogImage3 from "../../blogimages/blog_image3.webp";
import blogImage4 from "../../blogimages/blog_image4.webp";
import blogImage5 from "../../blogimages/blog_image5.webp";
import blogImage6 from "../../blogimages/blog_image6.webp";
import blogImage7 from "../../blogimages/blog_image7.webp";
import blogImage8 from "../../blogimages/blog_image8.webp";
import blogImage9 from "../../blogimages/blog_image9.webp";
import blogImage10 from "../../blogimages/blog_image10.webp";
import blogImage11 from "../../blogimages/blog_image11.webp";
import blogImage12 from "../../blogimages/blog_image12.webp";

export default function BlogPage() {
  pageTitle("BLOG & NEWS");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const blogImages = [
    {
      id: 1,
      image: blogImage1,
      title:
        "Four start‑ups shoot for the stars in South Australian Venture Catalyst Space Program",
      link: "https://sasic.sa.gov.au/events-news-media/news/four-start-ups-shoot-for-the-stars-in-south-australian-venture-catalyst-space-program/",
    },
    {
      id: 2,
      image: blogImage2,
      title:
        "Reinforced plastic fuel tanks in space and mobile insulin farms rocketing SA’s space sector",
      link: "https://icc.unisa.edu.au/newsroom/2024/reinforced-plastic-fuel-tanks-in-space-and-mobile-insulin-farms-rocketing-sas-space-sector/",
    },
    {
      id: 3,
      image: blogImage3,
      title: "No Liquid Helium, But Still Extremely Cool",
      link: "https://www.nist.gov/news-events/news/2017/05/no-liquid-helium-still-extremely-cool",
    },
    {
      id: 4,
      image: blogImage4,
      title: "Electronics like it cold, and 30 K cryocooler delivers",
      link: "https://phys.org/news/2013-01-electronics-cold-cryocooler.html",
    },
    {
      id: 5,
      image: blogImage5,
      title: "Prepping Advanced EOTS for flight tests",
      link: "https://www.flightglobal.com/lockheed-prepping-advanced-eots-and-legion-pod-for-flight-tests/119918.article",
    },
    {
      id: 6,
      image: blogImage6,
      title:
        "Amazon Web Services selects 24 Indian startups for space accelerator programme",
      link: "https://yourstory.com/2024/06/aws-selects-24-indian-startups-for-space-accelerator-programme",
    },
    {
      id: 7,
      image: blogImage7,
      title: "AWS India’s first-ever space accelerator to support 24 startups",
      link: "https://www.aboutamazon.in/news/aws/aws-indias-first-ever-space-accelerator",
    },
    {
      id: 8,
      image: blogImage8,
      title: "AWS Picks 24 Indian Startups for space accelerator programme",
      link: "https://www.socialnews.xyz/2024/06/28/aws-picks-24-indian-startups-for-space-accelerator-programme/",
    },
    {
      id: 9,
      image: blogImage9,
      title: "AWS India’s first-ever space accelerator to support 24 startups",
      link: "https://www.expresscomputer.in/news/aws-indias-first-ever-space-accelerator-to-support-24-startups/113517/",
    },
    {
      id: 10,
      image: blogImage10,
      title: "AWS Picks 24 Indian Startups For Space Accelerator Programme",
      link: "https://www.freepressjournal.in/business/aws-picks-24-indian-startups-for-space-accelerator-programme?_gl=1*11jrtrr*_ga*ZEhWWGJXTFZoU0xzUTB2dlN6VVU5YjB3QXBVX3pWVFY4ZmNKZ2NMYmZiUjFpVzFlTnNwYUsyX0djakwtZ0l5RA..*_ga_0LR4WDK2V3*MTcxOTU1NzM5NS4yLjEuMTcxOTU1NzM5NS4wLjAuMA",
    },
    {
      id: 11,
      image: blogImage11,
      title:
        "AWS announces first space tech accelerator program in India with 24 shortlisted startups",
      link: "https://www.thehindubusinessline.com/news/science/aws-announces-first-space-tech-accelerator-program-in-india-with-24-shortlisted-startups/article68343682.ece",
    },
    {
      id: 12,
      image: blogImage12,
      title: "Onnes wins AI in Energy Award at Telangana AI Summit",
      link: "https://www.linkedin.com/feed/update/urn:li:activity:7235561024387432448/"
    },
  ];

  return (
    <>
      <PageHeading
        title="BLOG & NEWS"
        bgSrc="/images/blog_hero_bg.jpeg"
        pageLinkText="BLOG & NEWS"
      />
      <Spacing lg="150" md="80" />

      {/* Blog Grid Section: images appear below the main heading */}
      <Div className="container">
        <Grid container rowSpacing={6} columnSpacing={4} sx={{ padding: 4 }}>
          {blogImages.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Box sx={{ textAlign: "center" }}>
                <img
                  src={item.image}
                  alt="Blog"
                  style={{
                    width: "320px",
                    height: "235px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    marginTop: 2,
                    fontWeight: 500,
                    fontSize: "1.1rem",
                    maxWidth: "320px",
                    mx: "auto",
                    textAlign: "center",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    color: "white", // Set text color to white
                  }}
                >
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: "none",
                      color: "white", // Ensure link text is also white
                      wordWrap: "break-word",
                      display: "inline-block",
                    }}
                  >
                    {item.title}
                  </a>
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Div>

      <Spacing lg="150" md="80" />
      <Div className="container">
        <Cta
          title="Let’s discuss to make <br /> ultra <i>cool</i> and <i>light</i> tanks integrated with bespoke cryogenic systems"
          btnText="Contact Us"
          btnLink="/contact"
          bgSrc="/images/cta_bg.jpeg"
        />
      </Div>
    </>
  );
}
