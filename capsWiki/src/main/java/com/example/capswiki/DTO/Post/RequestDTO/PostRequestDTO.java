package com.example.capswiki.DTO.Post.RequestDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class PostRequestDTO {
    private String title;
    private String writerName;
    private String content;
}
