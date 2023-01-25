import React, { useState, useEffect } from 'react';
import { size } from "lodash";
import { Newsletter } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { EmailItem } from "../../../../components/Admin/Newsletter"
import {Loader, Pagination} from "semantic-ui-react"
import "./ListEmails.scss"

const newsletterController = new Newsletter();

export function ListEmails() {
    const {accessToken} = useAuth();
    const [emails, setEmails] = useState(null);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(null);
    const [reload, setReload] = useState(false);

    const onReload = () => setReload((prevState) => !prevState);

    useEffect(() => {
        (async () => {
            try {
                const response = await newsletterController.index(accessToken,{ page, limit: 3});
                setEmails(response.docs);
                setPagination({
                    limit: response.limit,
                    page: response.page,
                    pages: response.pages,
                    total: response.total
                  });

            } catch (error) {
                console.log(error);
            }
        })()
    }, [page,reload])

    const changePage = (_, data) => {
        setPage(data.activePage)
      }

    if(!emails) return <Loader active inline="centered"/>
    if(size(emails) === 0) return "No hay emails registrados";

  return (
    <div className='list-emails'>
        {emails.map((email) => (
            <EmailItem key={email._id} email={email} onReload={onReload}/>
        ))}

        <div className='list-emails__pagination'>
            <Pagination
            totalPages={pagination.pages}
            defaultActivePage={pagination.page}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            onPageChange={changePage}
            />
        </div>
    </div>
  )
}
