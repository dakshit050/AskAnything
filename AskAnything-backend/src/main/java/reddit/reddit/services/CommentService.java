package reddit.reddit.services;

import com.github.marlonlom.utilities.timeago.TimeAgo;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import reddit.reddit.dto.CommentDto;
import reddit.reddit.exceptions.PostNotFoundException;
import reddit.reddit.model.Comment;
import reddit.reddit.model.NotificationEmail;
import reddit.reddit.model.Post;
import reddit.reddit.model.User;
import reddit.reddit.repositories.CommentRepository;
import reddit.reddit.repositories.PostRepository;
import reddit.reddit.repositories.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class CommentService {
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private AuthService authService;
    private CommentRepository commentRepository;
    private final MailcontentBuilder mailcontentBuilder;
    private final MailService mailService;
    private static final String POST_URL="";
    public void save(CommentDto commentDto){
        Post post=postRepository.findById(commentDto.getPostId()).orElseThrow(()-> new PostNotFoundException(commentDto.getPostId().toString()));
       Comment comment= Comment.builder()
                .createdDate(java.time.Instant.now())
                .text(commentDto.getText())
                .post(post)
                .id(commentDto.getId())
                .user(authService.getCurrentUser())
                .build();
       commentRepository.save(comment);
       String message=mailcontentBuilder.build(post.getUser().getUsername()+"Posted a comment on your post."+POST_URL);
        sendCommentNotificication(message,post.getUser());
    }

    private void sendCommentNotificication(String message, User user) {
        mailService.sendMail(new NotificationEmail(user.getUsername()+"Commented on your post",user.getEmail(),message));
    }

    public List<CommentDto> getAllCommentForPost(Long id) {
        Post post=postRepository.findById(id).orElseThrow(()-> new PostNotFoundException(id.toString()));
        return commentRepository.findByPost(post).stream().map(this::toDto).collect(Collectors.toList());
    }

    private CommentDto  toDto(Comment comment) {
        return CommentDto.builder()
                .createdDate(TimeAgo.using(comment.getCreatedDate().toEpochMilli()))
                .id(comment.getId())
                .postId(comment.getPost().getPostId())
                .text(comment.getText())
                .userName(comment.getUser().getUsername())
                .build();
    }

    public List<CommentDto> getAllCommentForUser(String name) {
        User user=userRepository.findByUsername(name).orElseThrow(()-> new UsernameNotFoundException(name));
       return commentRepository.findByUser(user).stream().map(this::toDto).collect(Collectors.toList());
    }
}
