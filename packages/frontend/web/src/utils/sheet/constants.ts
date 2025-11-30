import { Style, WorkbookView, WorksheetView } from 'exceljs'

export const QTD_ROWS = 100
export const SHEET_NAME = 'Cadastro'
export const SHEET_PASSWORD = 'senha' // process.env?.sheetPass
export const USER_NAME = 'Certificados IFBA'
export const TITLE = 'Planilha de importação'
export const MESSAGE_ERROR = 'Valor inválido'

export const WORKSHEET_VIEW: WorksheetView = {
  rightToLeft: false,
  state: 'frozen',
  xSplit: 0,
  ySplit: 1,
  topLeftCell: 'A2',
  showRuler: true,
  showRowColHeaders: true,
  showGridLines: false,
  zoomScale: 100,
  zoomScaleNormal: 100,
  activeCell: 'A2'
}

export const WORKBOOK_VIEW: WorkbookView = {
  x: 0,
  y: 0,
  width: 10000,
  height: 20000,
  firstSheet: 0,
  activeTab: 0,
  visibility: 'visible'
}

export const HEADER_STYLE: Partial<Style> = {
  fill: {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: '3CA63A' }
  },
  font: {
    size: 11,
    color: { argb: 'FFFFFF' },
    name: 'Calibri',
    family: 2,
    charset: 1,
    bold: true
  },
  alignment: {
    horizontal: 'center',
    vertical: 'middle'
  },
  border: {
    top: { style: 'thin' },
    left: { style: 'thin' },
    bottom: { style: 'thin' },
    right: { style: 'thin' }
  }
}

export const CELL_STYLE: Partial<Style> = {
  font: {
    size: 11,
    color: { argb: '000000' },
    name: 'Calibri',
    family: 2,
    charset: 1
  },
  border: {
    top: { style: 'thin' },
    left: { style: 'thin' },
    bottom: { style: 'thin' },
    right: { style: 'thin' }
  },
  protection: {
    locked: false
  }
}
