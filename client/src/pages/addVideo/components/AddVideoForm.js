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
	FormTitle,

  DropDownMain,
  DropDownContainer,
  DropDownHeader,
  DropDownListContainer,
  DropDownList,
  ListItem,


} from './AddContentFormStyles';
import { Container } from './globalStyles';

const AddVideoForm = () => {
	const [data, setData] = useState({
		email: "",
		password: "",
    businessName: "",
    businessAddress: "", 
    phone: "" 

	});
	const [setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
    
	}; 

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `${process.env.REACT_APP_I_STREAM_API}/client/sign-up`;
			const { data: res } = await axios.post(url, data)
      // console.log(res)

		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			){
				setError(error.response.data.message);
			}
		}
	};

  // Genre Drop down options
  const genreOptions = ["Action", "Thriller", "Romance", "Horror", "Documentary"];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = value => () => {
    setSelectedOption(value);
    setIsOpen(false);
    console.log(selectedOption);
  };

	return (
    <FormSection>
      <Container>
        <FormRow>
          <FormColumn small>
            <FormTitle>Add Content</FormTitle>
            <FormWrapper onSubmit={handleSubmit}>
              <FormInput
                type="text"
                placeholder="Content Title"
                name="content-title"
                onChange={handleChange}
                value={data.title}
                required
              />
              <DropDownContainer>
                <DropDownHeader onClick={toggling}>
                  {selectedOption || "Genre"}

                </DropDownHeader>
                {isOpen && (
                  <DropDownListContainer>
                    <DropDownList>
                      {genreOptions.map((option) => (
                        <ListItem
                          onClick={onOptionClicked(option)}
                          key={Math.random()}
                        >
                          {option}
                        </ListItem>
                      ))}
                    </DropDownList>
                  </DropDownListContainer>
                )}
              </DropDownContainer>

              <FormInput
                type="address"
                placeholder="Release Date"
                name="businessAddress"
                onChange={handleChange}
                value={data.businessAddress}
                required
              />
            </FormWrapper>
            <div className={styles.left}>
              <FormButton type="submit">Next</FormButton>
            </div>
          </FormColumn>
        </FormRow>
      </Container>
    </FormSection>
  );

};

export default AddVideoForm;
