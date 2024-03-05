package com.example.capswiki.Domain.Post.Service;

import com.example.capswiki.DAO.Post.Post;
import com.example.capswiki.DTO.Post.RequestDTO.PostRequestDTO;
import com.example.capswiki.DTO.Post.ResponseDTO.PostResponseDTO;

import java.util.List;

public interface PostService {

    //구현할 api들을 여기서 선언을 해두고, Service impl 파일에서 해당 기능들을 구현하는 방식
    public void createPost(PostRequestDTO postRequestDTO);

    public PostResponseDTO getPost(String title);

    public Post updatePost(PostRequestDTO postRequestDTO, String title);

    public void deletePost(String title);

    public List<PostResponseDTO> getPostHistory(String title);

    public PostResponseDTO getRandomPost();

    public List<PostResponseDTO> getPostList();
}
