import { Add, Remove } from "@mui/icons-material";
import React, { useState } from "react";
import '../../../styles/SingleReview/Votes.scss';

const Votes = ({className}) => {
    const [vote, setVote] = useState(0);

    const AddVote = () => {
          setVote(prev => prev + 1);
    };

    const RemoveVote = () => {
        setVote(prev => {
            return vote <= 0 ? setVote(0) : prev - 1
        });
    };

    return (
        <div className={`votes ${className}`}>
          <Add onClick={AddVote}/>
          <p>{vote}</p>
          <Remove onClick={RemoveVote}/>
        </div>
    )
};

export default Votes;