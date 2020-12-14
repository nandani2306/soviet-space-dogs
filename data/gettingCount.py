#!/usr/bin/env python
# coding: utf-8

# In[51]:


import pandas as pd
dog_data = pd.read_csv('C:/Users/nanda/OneDrive/Course material/Fall2020/DV/homework-05-innovative-vis-nandani2306/data/Dogs.csv')
flight_data=pd.read_csv('C:/Users/nanda/OneDrive/Course material/Fall2020/DV/homework-05-innovative-vis-nandani2306/data/Flights.csv')


# In[52]:


flight_data=flight_data.assign(dogs=flight_data.dogs.str.split(',')).explode('dogs')


# In[53]:


dog_count = flight_data['dogs'].value_counts().rename_axis('Name').reset_index(name='counts')


# In[57]:


result=pd.merge(dog_count,dog_data,on='Name',how="right").fillna(0)
result.to_csv('C:/Users/nanda/OneDrive/Course material/Fall2020/DV/homework-05-innovative-vis-nandani2306/data/Dogs1.csv')


# In[ ]:




