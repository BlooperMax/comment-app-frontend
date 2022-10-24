import { DateTime } from "luxon";

export const Comment = ({ fromUser, date, content }) => {

  const dateFormat = DateTime.fromMillis(date).setLocale('es').toLocaleString();

    return (
      <div className='comment'>
        <span className='comment-name'>{fromUser.name}</span>
        <span className='comment-date'> {dateFormat}</span>
        <p className='comment-content'>
          {content}
        </p>
      </div>
    )
  }