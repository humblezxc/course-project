import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export default function Comment({comment}) {
    return(
      <Box className={"comment"}>
          {/*<Grid className={"comment-image-container"}>*/}
          {/*    <img src={"/"} />*/}
          {/*</Grid>*/}
          <Grid className={"comment-right-part"}>
              <Grid className={"comment-content"}>
                  <Grid className={"comment-author"}>comment.username</Grid>
                  <Grid>{comment.createdAt}</Grid>
              </Grid>
              <Grid className={"comment-text"}>{comment.body}</Grid>
          </Grid>
      </Box>
    );
}
