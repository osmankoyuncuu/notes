import { Form } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Stack from "react-bootstrap/esm/Stack";
import CreatableReactSelect from "react-select/creatable";
import { useRef, FormEvent, useState } from "react";
import { NoteData, Tag } from "../App";
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from "react-router-dom";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

const NoteForm = ({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
}: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });
    navigate("..");
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={2}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} required defaultValue={title} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect
                onCreateOption={(label) => {
                  const newTag = { id: uuid(), label };
                  onAddTag(newTag);
                  setSelectedTags((prev) => [...prev, newTag]);
                }}
                isMulti
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control
            ref={markdownRef}
            required
            defaultValue={markdown}
            as="textarea"
            rows={5}
          />
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button type="submit" variant="primary">
            Save
          </Button>
          <Link to="..">
            <Button type="button" variant="outline-secondary">
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
};

export default NoteForm;
