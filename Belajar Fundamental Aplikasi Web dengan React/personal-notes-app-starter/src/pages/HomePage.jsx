import React from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import NoteList from '../components/NoteList';
import LoadingIndicator from '../components/LoadingIndicator';
import { getActiveNotes } from '../utils/network-data';
import { useLanguage } from '../contexts/LanguageContext';

function HomePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { t } = useLanguage();
    const [notes, setNotes] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [errorMessage, setErrorMessage] = React.useState('');
    const keyword = searchParams.get('keyword') || '';

    React.useEffect(() => {
        let isActive = true;

        const fetchNotes = async () => {
            setIsLoading(true);

            const response = await getActiveNotes();

            if (!isActive) {
                return;
            }

            if (response.error) {
                setErrorMessage(response.message || t('notesLoadError'));
                setNotes([]);
            } else {
                setNotes(response.data);
                setErrorMessage('');
            }

            setIsLoading(false);
        };

        fetchNotes();

        return () => {
            isActive = false;
        };
    }, [t]);

    const filteredNotes = notes.filter((note) => {
        const normalizedKeyword = keyword.toLowerCase();
        return note.archived === false && note.title.toLowerCase().includes(normalizedKeyword);
    });

    const handleKeywordChange = (value) => {
        const nextSearchParams = new URLSearchParams(searchParams);

        if (value) {
            nextSearchParams.set('keyword', value);
        } else {
            nextSearchParams.delete('keyword');
        }

        setSearchParams(nextSearchParams, { replace: true });
    };

    if (isLoading) {
        return <LoadingIndicator label={t('loadingNotes')} />;
    }

    return (
        <section className="page-content">
            <div className="page-heading">
                <div>
                    <p className="page-kicker">{t('activeNotes')}</p>
                    <h2 className="page-title">{t('notes')}</h2>
                </div>
                <p className="page-lead">{t('activeNotesLead')}</p>
            </div>

            <SearchBar keyword={keyword} onKeywordChange={handleKeywordChange} placeholder={t('searchPlaceholder')} />
            {errorMessage ? <p className="form-feedback form-feedback--error">{errorMessage}</p> : null}
            <NoteList notes={filteredNotes} emptyMessage={t('noNotes')} />
        </section>
    );
}

export default HomePage;
