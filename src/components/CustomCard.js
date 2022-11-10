import React from 'react'
import MuiCardHeader from "@mui/material/CardHeader"
import styled from '@emotion/styled';
import { Avatar, Box, Card, CardContent, Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const CardHeader = styled((props) => <MuiCardHeader {...props} />)(
    ({ theme }) => ({
        backgroundColor: "rgb(0, 0, 97)",
        color: "#fff",
        padding: "6px",
        textAlign: "center",
        "& .MuiCardHeader-title": {
            fontSize: "16px"
        }
    })
);

const ITEM_HEIGHT = 48;


const style = {
    width: "100%",
    height: "max-content",
    borderRadius: "10px",
    "& .MuiCardContent-root": {
        padding: "0 !important",

        "& .MuiBox-root": {
            padding: "0.5em 1em",
            margin: 0,
            "&:not(:last-child)": {
                borderBottom: "1px solid #ccc"
            }
        }
    }

}

export default function CustomCard({ handleClose, handleRemove, handleClick, anchorEl, open, designationData, title }) {

    return (
        <Card sx={style}>
            <CardHeader
                title={title}
            />
            <CardContent>
                {designationData?.map((item) => (
                    <Box key={item.id} sx={{ flexGrow: 1, display: "flex", justifyContent: "space-between", mb: "1em" }}>
                        <Grid display={"flex"}>
                            <Avatar>{item.name}</Avatar>
                            <span style={{ marginLeft: "1em" }}>
                                <Typography vvariant='body1' color="darkblue" fontWeight={"600"}>{item.name}</Typography>
                                <Typography variant='body2' color="darkblue">{item.experience}</Typography>
                            </span>
                        </Grid>
                        <Grid>
                            <IconButton
                                aria-label="more"
                                id="long-button"
                                aria-controls={open ? 'long-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={(e) => handleClick(e, item)}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                PaperProps={{
                                    style: {
                                        maxHeight: ITEM_HEIGHT * 4.5,
                                        width: '20ch',
                                    },
                                }}
                            >
                                <MenuItem onClick={handleClose}>Lead</MenuItem>
                                <MenuItem onClick={handleRemove}>Remove</MenuItem>
                            </Menu>
                        </Grid>
                    </Box>
                ))}
            </CardContent>
        </Card>
    )
}
