import React from 'react'
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import Select from "react-dropdown-select";
import styles from "./styles.module.css";

import {
	FormColumn,
	FormWrapper,
	FormInput,
	FormSection,
	FormRow,
	FormButton,
  AddVideoButton,
	FormTitle,

  DropDownMain,
  DropDownContainer,
  DropDownHeader,
  DropDownListContainer,
  DropDownList,
  ListItem,


} from './VideoListStyles';
import { Container } from './globalStyles';

const AddVideoForm = () => {
	const [data, setData] = useState({
		contentTitle: "",
		genre: "",
    type: "",
    releaseDate: "", 
    language: "",
    videoFile: ""
	});
	const [setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	}; 

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `${process.env.REACT_APP_I_STREAM_API}/video/add-video`;
			const { data: res } = await axios.post(url, data)
      console.log(data)
      // console.log(res)

		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			){
				setError(error.response.data.message);
        console.log(error.response.data.message)
			}
		}
	};

  //Genre Drop down options
  const genreOptions = ["Action", "Thriller", "Romance", "Horror", "Documentary"];

  const [isGenreOpen, setGenreIsOpen] = useState(false);
  const [selectedGenreOption, setSelectedGenreOption] = useState(null);

  const genreToggling = () => setGenreIsOpen(!isGenreOpen);

  const onGenreOptionClicked = value => () => {
    setSelectedGenreOption(value);
    setGenreIsOpen(false);
    console.log(selectedGenreOption);
    data.genre = value
  };

    //Type Drop down options  
    const typeOptions = ["Movie", "Short Video", "TV Show"];

    const [isTypeOpen, setTypeIsOpen] = useState(false);
    const [selectedTypeOption, setSelectedTypeOption] = useState(null);
  
    const typeToggling = () => setTypeIsOpen(!isGenreOpen);
  
    const onTypeOptionClicked = value => () => {
      setSelectedTypeOption(value);
      setTypeIsOpen(false);
      console.log(selectedTypeOption);
      data.type = value
    };

	return (
    <FormSection>
      <Container>
        <FormRow>
          <FormColumn small>
            <FormTitle>Add Content</FormTitle>
            <FormWrapper>
              <FormInput
                type="text"
                placeholder="Content Title"
                name="contentTitle"
                onChange={handleChange}
                required
              />
              <DropDownContainer>
                <DropDownHeader onClick={genreToggling}>
                  {selectedGenreOption || "Genre"}
                </DropDownHeader>
                {isGenreOpen && (
                  <DropDownListContainer>
                    <DropDownList>
                      {genreOptions.map((option) => (
                        <ListItem
                          onClick={onGenreOptionClicked(option)}
                          key={Math.random()}
                          value={data.genre}
                        >
                          {option}
                        </ListItem>
                      ))}
                    </DropDownList>
                  </DropDownListContainer>
                )}
              </DropDownContainer>

              <FormInput
                type="date"
                placeholder="Release Date"
                name="releaseDate"
                onChange={handleChange}
                value={data.releaseDate}
                required
              />

              <DropDownContainer>
                <DropDownHeader onClick={typeToggling}>
                  {selectedTypeOption || "Type"}
                </DropDownHeader>
                {isTypeOpen && (
                  <DropDownListContainer>
                    <DropDownList>
                      {typeOptions.map((option) => (
                        <ListItem
                          onClick={onTypeOptionClicked(option)}
                          key={Math.random()}
                          value={data.type}
                        >
                          {option}
                        </ListItem>
                      ))}
                    </DropDownList>
                  </DropDownListContainer>
                )}
              </DropDownContainer>

              <FormInput
                type="text"
                placeholder="Language"
                name="language"
                onChange={handleChange}
                value={data.language}
                required
              />

              <div>
                <input type="file" value={data.videoFile} name="videoFile" onChange={handleChange} />
                {/* <AddVideoButton>Add Video</AddVideoButton> */}
              </div>
            </FormWrapper>

            <div className={styles.left}>
              <FormButton type="submit" onClick={handleSubmit}>
                Next
              </FormButton>
            </div>
          </FormColumn>
        </FormRow>
      </Container>
    </FormSection>
  );

};

export default AddVideoForm;
