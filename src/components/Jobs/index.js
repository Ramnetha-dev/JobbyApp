import Cookies from 'js-cookie'

import {Component} from 'react'
import {IoIosSearch} from 'react-icons/io'

import Header from '../Header'
import Profile from '../Profile'
import JobCard from '../JobCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {jobsList: [], searchInput: '', checkboxInputs: [], radioInput: ''}

  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {checkboxInputs, radioInput, searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${checkboxInputs}&minimum_package=${radioInput}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()

      const updatedData = fetchedData.jobs.map(job => ({
        id: job.id,
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({jobsList: updatedData})
    }
  }

  onClickSearchIcon = () => {
    const {searchInput, jobsList} = this.state
    const searchResults = jobsList.filter(each =>
      each.title.toLowerCase().includes(searchInput.toLowerCase()),
    )

    this.setState({jobsList: searchResults})
  }

  onGetRadioOption = event => {
    this.setState({radioInput: event.target.id}, this.getJobsData)
  }

  onGetInputOption = event => {
    const {checkboxInputs} = this.state
    const inputNotInList = checkboxInputs.filter(
      eachItem => eachItem === event.target.id,
    )

    if (inputNotInList.length === 0) {
      this.setState(
        prevState => ({
          checkboxInputs: [...prevState.checkboxInputs, event.target.id],
        }),
        this.getJobsData,
      )
    } else {
      const filteredData = checkboxInputs.filter(
        eachItem => eachItem !== event.target.id,
      )

      this.setState({checkboxInputs: filteredData}, this.getJobsData)
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {jobsList} = this.state

    return (
      <div className="jobs-container">
        <Header />
        <div className="jobs-lists-container">
          <div className="jobs-portal-container">
            <div className="search-inputs-container">
              <div className="search-container">
                <input
                  onChange={this.onChangeSearchInput}
                  type="search"
                  className="search-input"
                  placeholder="Search"
                />
                <button
                  type="button"
                  className="search-icon-button"
                  onClick={this.onClickSearchIcon}
                >
                  <IoIosSearch className="search-icon" />
                </button>
              </div>

              <div className="profile-options-container">
                <Profile />
                <hr className="line" />
                <ul className="types-of-employment-container">
                  <h1 className="employment-heading">Type of Employment</h1>
                  {employmentTypesList.map(eachItem => (
                    <li
                      className="employ-list-item"
                      key={eachItem.employmentTypeId}
                    >
                      <input
                        type="checkbox"
                        id={eachItem.employmentTypeId}
                        onChange={this.onGetInputOption}
                      />
                      <label
                        className="employ-label"
                        htmlFor={eachItem.employmentTypeId}
                      >
                        {eachItem.label}
                      </label>
                    </li>
                  ))}
                </ul>
                <hr className="line" />
                <ul className="salary-list-container">
                  <h1 className="salary-range-heading">Salary Range</h1>
                  {salaryRangesList.map(eachItem => (
                    <li
                      className="salary-list-item"
                      key={eachItem.salaryRangeId}
                    >
                      <input
                        name="option"
                        type="radio"
                        id={eachItem.salaryRangeId}
                        onChange={this.onGetRadioOption}
                      />
                      <label
                        className="salary-label"
                        htmlFor={eachItem.salaryRangeId}
                      >
                        {eachItem.label}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <ul className="jobs-list-container">
              <div className="search-ccontainer">
                <input
                  onChange={this.onChangeSearchInput}
                  type="search"
                  className="search-input"
                  placeholder="Search"
                />
                <button
                  type="button"
                  className="search-icon-button"
                  onClick={this.onClickSearchIcon}
                >
                  <IoIosSearch className="search-icon" />
                </button>
              </div>

              {jobsList.map(eachItem => (
                <JobCard key={eachItem.id} jobDetails={eachItem} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
