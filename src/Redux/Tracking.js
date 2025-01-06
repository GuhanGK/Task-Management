import { createSlice } from "@reduxjs/toolkit";
import videoImg from "../assets/videoImg.png";
import PostImg1 from "../assets/post-img-1.svg";
import PostImg2 from "../assets/post-img-2.svg";

const initialState = {
    posts: [
        {
            id: 1,
            username: "Ashick",
            time: "2 hours ago",
            text: "Just arrived in New York City! Excited to explore the sights, sounds, and energy of this amazing place. 🗽 #NYC #Travel",
            images: [PostImg2, PostImg1],
            likes: 2,
            bgColor: "#F7EBFF",
        },
        {
            id: 2,
            username: "John Doe",
            time: "5 hours ago",
            text: "Had an amazing coffee at Central Perk ☕ #FriendsFan",
            images: [videoImg],
            likes: 5,
            bgColor: "#FFFAEE",
        },
    ]
}

export const TrackingSlice = createSlice({
    name: "systemSlice",
    initialState,
    reducers: {
      setPosts: (state, action) => {
        return {
          ...state,
          initialLoader: action.payload,
        };
      },
    }
})

export const {
    setPosts,
  } = TrackingSlice.actions;
  
  export const TrackingReducer = TrackingSlice.reducer;