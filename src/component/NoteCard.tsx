import { Tag } from "../App";

type SimplifiedNote = {
  tags: Tag[];
  title: string;
  id: string;
};

const NoteCard = ({ id, title, tags }: SimplifiedNote) => {
  return <div>NoteCard</div>;
};

export default NoteCard;
