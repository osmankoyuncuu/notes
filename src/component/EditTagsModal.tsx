import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import { Tag } from "../types/types";

type EditTagsModalProps = {
  availableTags: Tag[];
  show: boolean;
  handleClose: () => void;
  updateTags: (id: string, label: string) => void;
  deleteTags: (id: string) => void;
};

const EditTagsModal = ({
  availableTags,
  handleClose,
  show,
  updateTags,
  deleteTags,
}: EditTagsModalProps) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map((tag) => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control
                    type="text"
                    value={tag.label}
                    onChange={(e) => updateTags(tag.id, e.target.value)}
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    variant="outline-danger"
                    onClick={() => deleteTags(tag.id)}
                  >
                    &times;
                  </Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditTagsModal;
