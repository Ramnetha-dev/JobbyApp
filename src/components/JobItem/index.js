import {Component} from 'react'

import {BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {RiShareBoxFill} from 'react-icons/ri'
import {FaStar} from 'react-icons/fa'

import Cookies from 'js-cookie'
import Header from '../Header'
import SkillsCard from '../SkillsCard'

import './index.css'

class JobItem extends Component {
  state = {jobItemData: {}, similarJobData: []}

  componentDidMount() {
    this.getJobItemDetails()
  }

  getItemDetails = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    skills: data.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
    title: data.title,
  })

  getSimilarJobData = each => ({
    companyLogoUrl: each.company_logo_url,
    employmentType: each.employment_type,
    id: each.id,
    jobDescription: each.job_description,
    location: each.location,
    rating: each.rating,
    title: each.title,
  })

  getJobItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    const updatedData = this.getItemDetails(data.job_details)

    const updatedSimilarJobItemData = data.similar_jobs.map(eachSimilarJob =>
      this.getSimilarJobData(eachSimilarJob),
    )

    this.setState({
      jobItemData: updatedData,
      similarJobData: updatedSimilarJobItemData,
    })
  }

  renderJobItemView = () => {
    const {jobItemData, similarJobData} = this.state
    console.log(jobItemData)
    console.log(similarJobData)
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      location,
      title,
      jobDescription,

      packagePerAnnum,
      rating,
      skills,
    } = jobItemData

    console.log(skills)

    return (
      <div className="job-container">
        <div className="company-logo-container">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="company-logo"
          />
          <div className="job-title-container">
            <h1 className="job-title">{title}</h1>
            <div className="job-rating-container">
              <FaStar className="star-icon" size={12} />
              <p className="rating-text">{rating}</p>
            </div>
          </div>
        </div>

        <div className="job-location-container">
          <div className="job-details-container">
            <div className="job-location-container">
              <MdLocationOn size={10} className="icon" />
              <p className="text">{location}</p>
            </div>
            <div className="employment-type-container">
              <BsBriefcaseFill size={10} className="icon" />
              <p className="text">{employmentType}</p>
            </div>
          </div>

          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="horizontal-line" />
        <div className="visit-container">
          <h1 className="description-heading">Description</h1>
          <a href={companyWebsiteUrl} className="visit-button">
            Visit <RiShareBoxFill className="share-icon" size={10} />
          </a>
        </div>
        <p className="job-description-txt">{jobDescription}</p>
        <h1 className="skills-heading">Skills</h1>

        <ul>
          {skills.map(eachSkillItem => (
            <SkillsCard skillDetails={eachSkillItem} key={eachSkillItem.name} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div className="job-item-container">
        <Header />

        <div className="jobs-item-bg-container">
          <div className="jobs-container">{this.renderJobItemView()}</div>
        </div>
      </div>
    )
  }
}

export default JobItem
