
import { db } from '../index'

export type Properties = { [key: string]: any }
export type Filters =  [string, '<' | '<=' | '==' | '>=' | '>', any][]
export type Sort = { [key: string]: 1 | -1 }

export type Id = string

export default class Model {
  static collection: string
  static sort: Sort
  static properties: Properties = {}

  static preprocess(data: Properties) {
    delete data.id
    return Promise.resolve(data)
  }

  static postprocess(doc: firebase.firestore.QueryDocumentSnapshot) {
    return Promise.resolve({ id: doc.id, ...doc.data() })
  }

  static list(filters: Filters=[], limit=50, page=0) {
    return this.filtered(filters)
      .limit(limit)
      .get()
      .then(snapshot => Promise.all(snapshot.docs.map(doc => this.postprocess(doc))))
  }

  static count(filters: Filters=[]) {
    return this.filtered(filters)
      .get()
      .then(snapshot => snapshot.size)
  }

  static get(id: Id) {
    return db.collection(this.collection).doc(id).get()
      .then(doc => this.postprocess(doc))
  }

  static create(data: Properties) {
    return this.preprocess(data).then(data =>
      db.collection(this.collection).add({
        created_at: new Date(),
        ...data
      })
    ).then(result => ({ id: result.id }))
  }

  static update(id: Id, data: Properties) {
    return this.preprocess(data).then(data =>
      db.collection(this.collection).doc(id).update(data)
    ).then(()=> ({ success: true }))
  }

  static destroy(id: Id) {
    return db.collection(this.collection).doc(id).delete()
      .then(()=> ({ success: true }))
  }

  static filtered(filters: Filters) {
    return filters.reduce((collection, filter)=> {
      return collection.where(filter[0], filter[1], filter[2])
    }, db.collection(this.collection))
  }
}