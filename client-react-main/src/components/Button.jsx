import React, { Children } from "react"

//đăng ký,đăng nhập
function Button({children,onClick,style}){
    return(
        <button onClick={onClick} 
            style={{ 
            display: "flex",
            flexDirection: "row",
            justifyContent:"space-between",
            color:"#FFFFFF",
            fontFamily: "'Montserrat', sans-serif",
            fontSize:"14px",
            fontWeight:"400",
            fontStyle:"normal",
            lineHeight: "20px",

            ...style,

            }}>
        {children}

        </button>
        
        

    );
};
export default Button;