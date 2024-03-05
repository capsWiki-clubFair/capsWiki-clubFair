package com.example.capswiki.Domain.Post.Service;

import com.example.capswiki.DAO.Post.Post;
import com.example.capswiki.DTO.Post.PostDTO;
import com.example.capswiki.DTO.Post.RequestDTO.PostRequestDTO;
import com.example.capswiki.DTO.Post.ResponseDTO.PostResponseDTO;
import com.example.capswiki.Domain.Post.Repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

import static java.sql.Types.NULL;

@Service
public class PostServiceImpl implements PostService {
    @Autowired // 레포지토리와 연결
    private PostRepository postRepository;


    @Transactional //게시글 작성하는 API 구현
    public void createPost(PostRequestDTO postRequestDTO) { // 매개변수인 postRequestDTO로 작성할 정보를 전달 받음!

        //전달 받은 postRequestDTO로 부터 필요한 정보들을 get 메서드를 통해 추출!
        String writerName = postRequestDTO.getWriterName();
        String title = postRequestDTO.getTitle();
        String content = postRequestDTO.getContent();
        Timestamp createdDate = new Timestamp(System.currentTimeMillis());
        // 시간은 현재 시간을 사용

        int is_deleted = 0;
        // is_deleted는 추후에 수정 기능을 구현하면서 추가 개발을 해나가면 됨. 일단은 0으로 세팅

        PostDTO postDTO = new PostDTO(
                NULL,
                title,
                content,
                writerName,
                createdDate,
                is_deleted
        );
        // 추출한 정보들을 바탕으로 PostDTO를 생성! 해당 DTO로 DB에 저장.

        postRepository.save(postDTO.toEntity());
        //레포지토리에 JPA save를 통해서 위 추출한 정보들을 DB에 저장! 이때 엔티티로 .toEntity()를 통해 변환해서 저장하여야함.
    }

    public PostResponseDTO getPost(String title) {

        Post post = postRepository.findPostByTitleAndIsDeleted(title, 0);

        return new PostResponseDTO(
                post.getPostId(),
                post.getTitle(),
                post.getWriterName(),
                post.getContent(),
                post.getTime(),
                post.getIsDeleted()
        );
    }

    @Transactional
    public Post updatePost(PostRequestDTO postRequestDTO, String title) {

        // 기존 글 불러와서 isDeleted 1로 변경
        Post post = postRepository.findPostByTitleAndIsDeleted(title, 0);
        post.delete();

        // 새 글 작성
        String writerName = postRequestDTO.getWriterName();
        String content = postRequestDTO.getContent();
        Timestamp createdDate = new Timestamp(System.currentTimeMillis());

        int is_deleted = 0;

        PostDTO postDTO = new PostDTO(
                NULL,
                title,
                content,
                writerName,
                createdDate,
                is_deleted
        );

        postRepository.save(postDTO.toEntity());
        return post; // 테스트 확인용
    }

    @Transactional
    public void deletePost(String title) {
        postRepository.deleteByTitle(title);
    }

    public List<PostResponseDTO> getPostHistory(String title) {

        List<Post> postList = postRepository.findPostByTitleOrderByTime(title);

        return postList.stream()
                .map(post -> new PostResponseDTO(
                        post.getPostId(),
                        post.getTitle(),
                        post.getWriterName(),
                        post.getContent(),
                        post.getTime(),
                        post.getIsDeleted()
                ))
                .collect(Collectors.toList());
    }


    @Transactional
    public PostResponseDTO getRandomPost(){
        // 등록된 총 게시글의 개수를 가져옴
        List<Post> postList = postRepository.findAllByIsDeleted(0);
        int num = postList.size();

        //해당 난수를 가진 게시글을 조회
        Post tempPost = null;
        Random random = new Random();
        int i = 0;

        while (tempPost == null) {
            // 총 개수를 범위로 지정하여 난수를 생성
            i = random.nextInt(num);
            tempPost = postList.get(i); //해당 난수를 인덱스로 가지는 게시글 선택
        }

        PostResponseDTO postResponseDTO = new PostResponseDTO(
                tempPost.getPostId(),
                tempPost.getTitle(),
                tempPost.getWriterName(),
                tempPost.getContent(),
                tempPost.getTime(),
                tempPost.getIsDeleted()
        );

        //반환
        return postResponseDTO;
    }

    @Transactional
    public List<PostResponseDTO> getPostList(){

        List<PostResponseDTO> postListResponseDTOS = new ArrayList<>();

        List<Post> postList = postRepository.findPostsByIsDeletedOrderByTimeDesc(0);

        for (Post post : postList) {
            PostResponseDTO postResponseDTO = new PostResponseDTO   (
                    post.getPostId(),
                    post.getTitle(),
                    post.getContent(),
                    post.getWriterName(),
                    post.getTime(),
                    post.getIsDeleted()
            );
            postListResponseDTOS.add(postResponseDTO);
        }
        return postListResponseDTOS;
    }
}
