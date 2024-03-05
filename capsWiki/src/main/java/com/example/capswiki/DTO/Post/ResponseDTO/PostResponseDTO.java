package com.example.capswiki.DTO.Post.ResponseDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class PostResponseDTO {
    private int postId;
    private String title;
    private String writerName;
    private String content;
    private Timestamp createdDate;
    private int is_deleted;

}