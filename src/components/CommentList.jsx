import CommentInput from "./CommentInput";

const CommentList = ({ comments }) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return (
    <ul>
      <CommentInput />
      {comments.map((comment) => {
        const createdAt = new Date(comment.created_at);
        return (
          <li className="comment" key={comment.comment_id}>
            <p>Author: {comment.author}</p>
            <p>Comment: {comment.body}</p>
            <p>Votes: {comment.votes}</p>
            <p>Commented: {createdAt.toLocaleDateString(undefined, options)}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default CommentList;
