import { useState } from 'react';

// local imports
import CommentFormDialog from './components/CommentFormDialog';
import Layout from './components/Layout';
import SeismicDataTable from './components/SeismicDataTable';

function App() {
    const [commentDialogOpen, setCommentDialogOpen] = useState(false);
    const [selectedFeatureId, setSelectedFeatureId] = useState(null);

    const handleOpenCommentDialog = (featureId) => {
        setSelectedFeatureId(featureId);
        setCommentDialogOpen(true);
    };

    const handleCloseCommentDialog = () => {
        setCommentDialogOpen(false);
        setSelectedFeatureId(null);
    };

    return (
        <Layout>
            <SeismicDataTable onCommentClick={handleOpenCommentDialog} title="Features" />
            {selectedFeatureId && (
                <CommentFormDialog featureId={selectedFeatureId} open={commentDialogOpen} handleClose={handleCloseCommentDialog} />
            )}
        </Layout>
    );
}

export default App;
