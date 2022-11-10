import { Accordion, AccordionDetails, Avatar, Box, Button, Card, CardContent, Grid, IconButton, Menu, MenuItem, Snackbar, Step, StepLabel, Stepper, Typography } from '@mui/material'
import { Container } from '@mui/system';
import React, { useCallback, useEffect, useState } from 'react'
import logo from "../images/logo.svg";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAlert from '@mui/material/Alert';
import styled from '@emotion/styled';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import axios from 'axios';
import CustomCard from './CustomCard';


const steps = [
    'Create Project',
    'Add Team',
    'Preview & Hire',
];

const AccordionSummary = styled((props) => <MuiAccordionSummary {...props} />)(
    ({ theme }) => ({
        borderRadius: "7px 7px 0 0",
        "& .MuiAccordionSummary-content": {
            margin: "0 !important",
            color: "#fff",
        },

        "& .Mui-expanded:before": {
            height: 0,
        },
    })
);


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


export default function Stepercomponent() {

    const [activeStep, setActiveStep] = React.useState(0);
    const [expanded, setExpanded] = useState(0);
    const [data, setData] = useState([])
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [isRender, setIsRender] = useState(false)
    const [designationData, setDesignationData] = useState({
        projectManager: [],
        uiuxDesigner: [],
        frontEnd: [],
        backEnd: [],
        qaTester: [],
        devOps: []
    });
    const [memberId, setMemberId] = useState(null)
    const [snack, setSnack] = useState(false);



    const handleNext = () => {
        setActiveStep(prev => prev + 1)
    }

    const handleExpand = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        let data = { ...designationData };
        let localData = window.localStorage;
        if (localData.designation) {
            data = JSON.parse(window.localStorage?.designation);
            setDesignationData(data)
        }

    }, [isRender])

    const getData = () => {
        axios.get("./data.json").then(res => {
            setData(res.data);
        }).catch(err => console.error(err))
    };


    const handleClick = (event, data) => {
        setAnchorEl(event.currentTarget);
        setMemberId(data)
    };
    const handleClose = () => {
        setAnchorEl(null);
    };



    const handleAdd = (data) => {
        setIsRender(!isRender);
        let temp = { ...designationData };
        let existedId = temp[data.role].find(item => item.id === data.id);
        if (existedId == undefined) temp[data.role].push(data);
        else setSnack(true)
        window.localStorage.designation = JSON.stringify(temp)
    };

    const handleRemove = () => {
        setIsRender(!isRender);
        let temp = { ...designationData };
        let data = temp[memberId.role].filter(item => item.id !== memberId.id)
        temp[memberId.role] = data
        window.localStorage.designation = JSON.stringify(temp)
        setAnchorEl(null);
    };


    return (
        <>
            <Container sx={{ marginBottom: "2em" }}>
                <img src={logo} alt="logo" />
            </Container>

            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>
                                <Typography variant="body2" color="darkblue">Step {index + 1}</Typography>
                                <Typography variant='body1' color="darkblue" fontWeight={"600"}>{label}</Typography>
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
            <Container>

                {activeStep !== 1 &&
                    <Grid container mt={5} justifyContent="flex-end">
                        <Button sx={{ marginRight: "3em" }} variant='contained' color='primary' onClick={handleNext}>
                            Next
                        </Button>
                    </Grid>}

                {activeStep == 0 &&
                    <Grid container item>
                        <Typography variant='h4'><em>Click Next to Create team</em></Typography>
                    </Grid>
                }


                {activeStep === 1 &&
                    <Grid container justifyContent={"space-between"} sx={{ "& .MuiGrid-root": { paddingRight: "15px", } }} mt={5}>
                        <Grid item sm={4} sx={{ borderRight: "1px solid #ccc" }}>
                            <Typography variant='h6' fontWeight={"600"} color="darkblue">Categories</Typography>
                            <Grid item container mt={3}>
                                {data.map((item, index) => (

                                    <Accordion
                                        style={{
                                            width: "100%",
                                            marginBottom: "1em",
                                            marginTop: "0",
                                            borderRadius: "7px"
                                        }}
                                        expanded={expanded == index}
                                        onChange={handleExpand(index)}
                                        key={item.id}
                                    >
                                        <AccordionSummary
                                            style={{
                                                minHeight: "35px",
                                                backgroundColor: "#0169fe",
                                            }}
                                            expandIcon={<AddCircleOutlineIcon sx={{ color: "#fff" }} />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                        >{item.categories}</AccordionSummary>
                                        <AccordionDetails>
                                            {item.member.map(emp => (
                                                <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "space-between", mb: "1em" }} key={emp.id}>
                                                    <Grid display={"flex"}>
                                                        <Avatar>{emp.name}</Avatar>
                                                        <span style={{ marginLeft: "1em" }}>
                                                            <Typography vvariant='body1' color="darkblue" fontWeight={"600"}>{emp.name}</Typography>
                                                            <Typography variant='body2' color="darkblue">{emp.experience}</Typography>
                                                        </span>
                                                    </Grid>
                                                    <Grid>
                                                        <Button variant='contained' onClick={() => handleAdd(emp)}>Add</Button>
                                                    </Grid>
                                                </Box>
                                            ))}
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            </Grid>
                        </Grid>
                        <Grid container item sm={7} alignContent="flex-start">
                            <Grid item sm={6}>
                                <Typography variant='h6' fontWeight={"600"} color="darkblue">Team Members</Typography>
                            </Grid>
                            <Grid item sm={6}>
                                <Grid style={{ float: "right" }}>
                                    <Button variant='contained' color='primary' onClick={handleNext}>
                                        Next
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container item sx={{ borderBottom: "1px solid #ccc", paddingRight: "0 !important", "& .MuiGrid-root": { "&:last-child": { paddingRight: "0 !important", paddingLeft: "15px", paddingBottom: "15px" } } }}>
                                <Grid container item sm={6} pt={2} sx={{ borderRight: "1px solid #ccc", paddingBottom: "1em", }}>
                                    <CustomCard
                                        handleClick={handleClick}
                                        handleClose={handleClose}
                                        handleRemove={handleRemove}
                                        anchorEl={anchorEl}
                                        open={open}
                                        title={"Project Manager"}
                                        designationData={designationData.projectManager}
                                    />
                                </Grid>
                                <Grid item sm={6} pt={2}>
                                    <CustomCard
                                        handleClick={handleClick}
                                        handleClose={handleClose}
                                        handleRemove={handleRemove}
                                        anchorEl={anchorEl}
                                        open={open}
                                        title={"UI/UX Designer"}
                                        designationData={designationData.uiuxDesigner}
                                    />
                                </Grid>

                            </Grid>

                            <Grid container item sx={{ borderBottom: "1px solid #ccc", paddingRight: "0 !important", "& .MuiGrid-root": { "&:last-child": { paddingRight: "0 !important", paddingLeft: "15px", paddingBottom: "15px" } } }}>
                                <Grid container item sm={6} pt={2} sx={{ borderRight: "1px solid #ccc", paddingBottom: "1em", }}>
                                    <CustomCard
                                        handleClick={handleClick}
                                        handleClose={handleClose}
                                        handleRemove={handleRemove}
                                        anchorEl={anchorEl}
                                        open={open}
                                        title={"Front End Developers"}
                                        designationData={designationData.frontEnd}
                                    />
                                </Grid>
                                <Grid item sm={6} pt={2}>
                                    <CustomCard
                                        handleClick={handleClick}
                                        handleClose={handleClose}
                                        handleRemove={handleRemove}
                                        anchorEl={anchorEl}
                                        open={open}
                                        title={"Back End Developers"}
                                        designationData={designationData.backEnd}
                                    />
                                </Grid>

                            </Grid>

                            <Grid container item sx={{ borderBottom: "1px solid #ccc", paddingRight: "0 !important", "& .MuiGrid-root": { "&:last-child": { paddingRight: "0 !important", paddingLeft: "15px", paddingBottom: "15px" } } }}>
                                <Grid container item sm={6} pt={2} sx={{ borderRight: "1px solid #ccc", paddingBottom: "1em", }}>
                                    <CustomCard
                                        handleClick={handleClick}
                                        handleClose={handleClose}
                                        handleRemove={handleRemove}
                                        anchorEl={anchorEl}
                                        open={open}
                                        title={"QA/Tester"}
                                        designationData={designationData.qaTester}
                                    />
                                </Grid>
                                <Grid item sm={6} pt={2}>
                                    <CustomCard
                                        handleClick={handleClick}
                                        handleClose={handleClose}
                                        handleRemove={handleRemove}
                                        anchorEl={anchorEl}
                                        open={open}
                                        title={"DevOps"}
                                        designationData={designationData.devOps}
                                    />
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>}
            </Container>

            <Snackbar open={snack} autoHideDuration={6000} onClose={() => setSnack(false)}>
                <Alert onClose={() => setSnack(false)} severity="error" sx={{ width: '100%' }}>
                    This member is already Exist.
                </Alert>
            </Snackbar>
        </>
    )
}
