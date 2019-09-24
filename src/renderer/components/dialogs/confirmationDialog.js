import React from 'react'
import { remote } from 'electron'
import { Classes } from '@blueprintjs/core'
import SmallDialog, { DeltaButtonPrimary, DeltaButtonDanger } from '../helpers/SmallDialog'

export function confirmationDialogLegacy (message, opts, cb) {
  if (!cb) cb = opts
  if (!opts) opts = {}
  const tx = window.translate
  var defaultOpts = {
    type: 'question',
    message: message,
    buttons: [tx('no'), tx('yes')]
  }
  remote.dialog.showMessageBox(Object.assign(defaultOpts, opts), response => {
    cb(response === 1) // eslint-disable-line
  })
}

export default function ConfirmationDialog (props) {
  const { message, cb, onClose } = props
  const yesIsDanger = props.yesIsDanger !== false

  const isOpen = !!message
  const tx = window.translate

  const onClick = yes => {
    onClose()
    cb(yes)
  }

  return (
    <SmallDialog
      isOpen={isOpen}
      onClose={(event) => {
        onClose()
        // eslint-disable-next-line standard/no-callback-literal
        cb(false)
      }}
    >
      <div className='bp3-dialog-body-with-padding'>
        <p>{message}</p>
        <div className={Classes.DIALOG_FOOTER}>
          <div
            className={Classes.DIALOG_FOOTER_ACTIONS}
            style={{ justifyContent: 'space-between', marginTop: '7px' }}
          >
            <DeltaButtonDanger
              noPadding
              onClick={() => yesIsDanger ? onClick(true) : onClick(false)}
            >
              { yesIsDanger ? tx('yes') : tx('no') }
            </DeltaButtonDanger>
            <DeltaButtonPrimary
              noPadding
              onClick={() => yesIsDanger ? onClick(false) : onClick(true)}
              style={{ marginLeft: '90px' }}
            >
              { yesIsDanger ? tx('no') : tx('yes') }
            </DeltaButtonPrimary>
          </div>
        </div>
      </div>
    </SmallDialog>
  )
}
