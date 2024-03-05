package com.example.capswiki.DAO.Post;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "post")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id", nullable = false)
    private int postId;
    @Column(name = "title", nullable = false)
    private String title;
    @Column(name = "content", length = 1000, nullable = false)
    private String content;
    @Column(name = "writer_name", length = 200, nullable = false)
    private String writerName;
    @Column(name = "time")
    private Timestamp time;
    @Column(name = "is_deleted")
    private int isDeleted;

    @Builder
    public Post(int postId, String writerName,
                       String title, String content,
                       Timestamp time,
                       int isDeleted) {
        this.postId = postId;
        this.writerName = writerName;
        this.title = title;
        this.content = content;
        this.time = time;
        this.isDeleted= isDeleted;
    }

    public void delete() {
        this.isDeleted = 1;
    }
}