package com.dakshit.Askanything.dto;

public class AuthenticationResponse {
    private final String jwt;
    private final String UserName;
    public AuthenticationResponse(String jwt,String userName){
        this.jwt=jwt;
        this.UserName=userName;
    }
    public String getJwt(){
        return jwt;
    }
    public String getUserName(){
        return UserName;
    }
}

