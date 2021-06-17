---
title: "Read more about the code"
date: 2021-05-17T22:47:09+02:00
draft: false
color: yellow
image: "header_code.png"
# link: "https://github.com/deep-dance/core"
---

# Quicklinks
- [Overview →](#overview)
- [Machine Learning →](#machine-learning)
- [Light animation →](#light-animation)

<br/>
<br/>

# Overview

The core software component of Deep.Dance is a system, that uses machine learning to study existing and create new movement sequences. In order to visualize these newly created movement sequences a web-based component, that could render them, was developed. An additional web-based component, that can control and animate a LED light setup on stage, was also to the set of components.

# Machine Learning

The purpose of the main software component was to extract movement sequences from existing video recordings, train a neural network such that it can predict subsequent movements and generate new movement sequences from arbitrary input movements. This resulted in a pipeline design that involved the stages described in the sections below.

## Dataset

First of all, a dataset that is needed for the training of the neural network was created. Since the aim was to create new movement sequences, it was decided to use an image-based approach and record videos of several predefined movement qualities done by several dancers. These videos are then fed into the first stage of the pipeline which uses the software libraries [Detectron2 →](https://github.com/facebookresearch/detectron2) and [VideoPose3D →](https://github.com/facebookresearch/VideoPose3D) to analyse all videos frame by frame and extract movement information in the form of keypoints. These keypoints are a representation of movement information of a human body. The following figure illustrates this by a rendering of extracted keypoints for the very same frame of an input video:

![](/code_single_01.png#img-small)
![](/code_single_02.png#img-small)

Since a video contains of a time series of frames, the result of the extraction process is also a time series, but of keypoints instead of frames. 


Please refer to the [Github →](https://github.com/deep-dance/core/) documentation for more information.

### Software
- [Detectron2 →](https://github.com/facebookresearch/detectron2)
- [VideoPose3D →](https://github.com/facebookresearch/VideoPose3D)

<br/>

## Training

In the next stage, the previously extracted keypoint sequences are used to train a neural network we developed, in order to generate new keypoint sequences. This was achieved by using a recurrent neural network design. These networks can analyze given time series and make predictions about the most likely next value in such a time series. Below, we extracted a snippet from the production code which creates and trains our neural network when executed:

```python
x, y = get_training_data(
    dancers=selected_dancers,
    tags=selected_tags,
    look_back=look_back,
    normalize_body=normalize_body,
    hip_correction=hip_correction,
    add_kinetic_energy=kinetic)

x_train, x_test, y_train, y_test = train_test_split(
        x, y, 
        test_size=test_size,
        shuffle=True,
        random_state=random_state)

model = DeepDanceModel(
    look_back=look_back,
    lstm_layers=lstm_layer,
    mdn_layers=mdn_layer,
    validation_split=validation_split,
    kinetic=kinetic)

model.train(
    x, y,
    epochs=epochs,
    batch_size=batch_size)
```

<br/>

### Software
- [Tensorflow →](https://www.tensorflow.org/)
- [Keras →](https://keras.io/)

<br/>

## Visualization

Since the aim of Deep.Dance was to have human dancers perform generated movement sequences, there was a need for a tool that could create a visual representation of these sequences. This tool facilitated the learning process by providing a sequence player with controls known from video players, such as play, pause etc.

![](/aboutCoding.jpg)

Please refer to the [Github →](https://github.com/deep-dance/visualizer/) documentation for more information.

### Software
- [Three.js →](https://threejs.org/)

<br/>
<br/>

# Light animation

The stage design of Deep.Dance required a custom light control system that was able to animate LED lights based on the keypoint position in the created movement sequences.

Read more and get the code on [Github →](https://github.com/deep-dance/lights).