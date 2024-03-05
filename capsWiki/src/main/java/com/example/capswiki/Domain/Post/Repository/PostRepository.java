package com.example.capswiki.Domain.Post.Repository;

import com.example.capswiki.DAO.Post.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {

    Post findPostByTitleAndIsDeleted(String title, int isDeleted); //제목으로 검색
    Post save(Post post); // 글 저장
    void deleteByTitle(String title); //제목으로 삭제
    List<Post> findPostByTitleOrderByTime(String title); //제목으로 전부 검색

    List<Post> findPostsByIsDeletedOrderByTimeDesc(int isDeleted);

    List<Post> findAllByIsDeleted(int isDeleted);
}