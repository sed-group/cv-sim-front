class ListGroupElement {
    static count = 0
    constructor (name, description, badge=null, identifier=ListGroupElement.count) {
        this.id = identifier
        this.name = name
        this.description = description
        this.badge = badge

        ListGroupElement.count++
    }
}

export default ListGroupElement