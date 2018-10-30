import Quill, { Delta } from 'quill'
import Model from './_model'


export class Chapter extends Model {
  static collection = 'chapters'

  static postprocess(doc: firebase.firestore.QueryDocumentSnapshot) {
    return super.postprocess(doc).then(doc => {
      let editor = new Quill(document.createElement('div'))
      editor.setContents(doc.contents)
      return {
        ...doc,
        excerpt: editor.getText(0, 100)
      }
    })
  }
}