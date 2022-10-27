from fastapi import APIRouter,Depends,Request,Response,HTTPException,status
from .. import models,schemas,utils
from sqlalchemy.orm import Session
from ..database import get_db
from typing import List
from ..auth import get_current_user
router=APIRouter(
    prefix="/jobs",
    tags=["jobs"]
)


# create a job
@router.post("/",response_model=schemas.Job)
async def create_job(job:schemas.JobCreate,
                     db:Session=Depends(get_db),
                     user:int=Depends(get_current_user)):
    new_job=models.Job(**job.dict(),owner_id=user.id)
    db.add(new_job)
    db.commit()
    db.refresh(new_job)
    return new_job

# fetch all jobs of cuurent user
@router.get("/",response_model=List[schemas.Job])
async def get_jobs(db:Session=Depends(get_db),user:int=Depends(get_current_user)):
    jobs=db.query(models.Job).filter(models.Job.owner_id==user.id).order_by(-models.Job.id).all()
    return  jobs


# get a job by it's id
@router.get("/{id}",response_model=schemas.Job)
async def get_job(id:int,db:Session=Depends(get_db),
                    user:int=Depends(get_current_user)):
    query=db.query(models.Job).filter(models.Job.id==id)
    job=query.first()
    if job==None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
        detail=f'Job with id-{id} not found')
    elif job.owner_id != int(user.id):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
        detail=f'This job is not your\'s.')
    return job

# update a job
@router.put("/{id}",response_model=schemas.Job)
async def update_job(id:int,job:schemas.JobUpdate ,
                    db:Session=Depends(get_db),
                    user:int=Depends(get_current_user)):
    query=db.query(models.Job).filter(models.Job.id==id)
    to_update=query.first()
    print(to_update)
    if not to_update:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND) 
    elif to_update.owner_id != int(user.id):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
        detail=f'This job is not your\'s.')
    query.update(job.dict(),synchronize_session=False)
    db.commit()
    return query.first()

# delete a job
@router.delete("/{id}")
async def delete_job(id:int,
                    db:Session=Depends(get_db),
                    user:int=Depends(get_current_user)):
    query=db.query(models.Job).filter(models.Job.id==id)
    to_delete=query.first()
    if to_delete==None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
        detail=f'Job with id-{id} not found')
    elif to_delete.owner_id != int(user.id):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
        detail=f'This job is not your\'s.')
    query.delete()
    db.commit()

    return {"detail":"The post has been removed."}
























