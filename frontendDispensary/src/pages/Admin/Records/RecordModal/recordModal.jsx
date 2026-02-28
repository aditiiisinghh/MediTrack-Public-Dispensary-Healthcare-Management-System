import React from 'react'
import './recordModal.css'

const RecordModal = (props) => {
    return (
        <div className='record-modal'>
            <div className='student-modal-report'>
                <div><strong>Name:</strong> {props.selectedHistory?.student?.name}</div>
                <div><strong>Roll:</strong> {props.selectedHistory?.roll}</div>
            </div>

            <div className='student-details-scroll'>
                <div className='student-modal-detail'>
                    <div className='student-modal-header'>
                        {props.selectedHistory?.createdAt.slice(0, 10).split("-").reverse().join("-")}
                    </div>

                    <div className='student-modal-body-student'>
                        <div className='student-modal-body-header'>
                            <div>Medicine Name</div>
                            <div>Quantity</div>
                        </div>

                        <div className='student-modal-body-item'>
                            {props.selectedHistory?.medicines?.map((med, index) => (
                                <div className='medicine-row' key={index}>
                                    <div>{med.name}</div>
                                    <div>{med.requiredQuantity}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecordModal
