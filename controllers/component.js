const Component = require('../models/Component')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const getAllComponents = async (req, res) => {
    const components = await Component.find({ createdBy: req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({ components, count: components.length })
}

const getComponent = async (req, res) => {
    const { 
        user: { userId }, 
        params: { id: compId },
    } = req

    const comp = await Component.findOne({
        _id: compId, 
        createdBy: userId
    })
    if(!comp){
        throw new NotFoundError(`No Component with id ${compId}`)
    }
    res.status(StatusCodes.OK).json({ comp })
}

const createComponent = async (req, res) => {
    req.body.createdBy = req.user.userId
    const component = await Component.create(req.body)
    res.status(StatusCodes.CREATED).json({ component })
}

const updateComponent = async (req, res) => {
    const { 
        body: { item, group, donation },
        user: { userId }, 
        params: { id: compId },
    } = req

    if (item === '' || group === '' || donation === '') {
        throw new BadRequestError('You Can Not Leave Any Fields Empty')
    }
    
    const comp = await Component.findOne({_id: compId, createdBy: userId })

    if (!comp) {
        throw new NotFoundError(`No Item Found With Id ${compId}`)
    }
    if (comp.status === 'Bouquet Delivered' || comp.status === 'Order Has Been Placed And Is Being Arranged' ) {
        throw new BadRequestError('This Order Cannot Be Modified')
    }

    const updatedComp = await Component.findByIdAndUpdate({_id: compId, createdBy: userId}, req.body, {new: true,
        runValidators: true
    })

    res.status(StatusCodes.OK).json({ updatedComp })
}

const deleteComponent = async (req, res) => {
    const { 
        user: { userId }, 
        params: { id: compId },
    } = req

    const comp = await Component.findOne({
       _id:  compId,
       createdBy: userId,
    })

    if(!comp){
        throw new NotFoundError(`No Component with id ${compId}`)
    }
    if (comp.status === 'Bouquet Delivered' || comp.status === 'Order Has Been Placed And Is Being Arranged') {
        throw new BadRequestError('This Order Cannot Be Modified')
    }
    await Component.findByIdAndDelete({
       _id:  compId,
       createdBy: userId,
    })
    res.status(StatusCodes.OK).json({ msg: "The Entry Was Deleted" })

}


module.exports = {
    getAllComponents,
    getComponent,
    createComponent,
    updateComponent,
    deleteComponent,

}