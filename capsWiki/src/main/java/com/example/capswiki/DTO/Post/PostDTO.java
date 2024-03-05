package com.example.capswiki.DTO.Post;

import com.example.capswiki.DAO.Post.Post;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
public class PostDTO {

    private int postId;

    private String title;

    private String content;

    private String writerName;

    private Timestamp createdDate;
    private int is_deleted;

    public Post toEntity() {
        return Post.builder()
                .postId(postId)
                .writerName(writerName)
                .title(title)
                .content(content)
                .time(createdDate)
                .isDeleted(is_deleted)
                .build();
    }
}
